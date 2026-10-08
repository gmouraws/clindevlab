import { compile } from '@mdx-js/mdx';
import {
  domains,
  variables,
  examples,
  glossary,
  sources,
  profile,
  toCsv,
} from './data';
import { readArticles, restrictMdx } from './content';
export function unique(values: string[], label: string) {
  if (new Set(values).size !== values.length)
    throw new Error(`Duplicate ${label}`);
}
export function checkSources(ids: string[]) {
  const known = new Set(sources.map((s) => s.id));
  for (const id of ids)
    if (!known.has(id)) throw new Error(`Missing source ${id}`);
}
export async function validateContent() {
  const articles = readArticles();
  const inventory: Record<string, string[]> = {
    DM: ['STUDYID', 'DOMAIN', 'USUBJID', 'SUBJID', 'AGE', 'SEX', 'RFSTDTC'],
    AE: [
      'STUDYID',
      'DOMAIN',
      'USUBJID',
      'AESEQ',
      'AETERM',
      'AESTDTC',
      'AEENDTC',
      'AESER',
    ],
    CM: [
      'STUDYID',
      'DOMAIN',
      'USUBJID',
      'CMSEQ',
      'CMTRT',
      'CMSTDTC',
      'CMENDTC',
    ],
    EX: ['STUDYID', 'DOMAIN', 'USUBJID', 'EXSEQ', 'EXTRT', 'EXDOSE'],
    LB: [
      'STUDYID',
      'DOMAIN',
      'USUBJID',
      'LBSEQ',
      'LBTESTCD',
      'LBORRES',
      'LBORRESU',
      'LBDTC',
    ],
    VS: [
      'STUDYID',
      'DOMAIN',
      'USUBJID',
      'VSSEQ',
      'VSTESTCD',
      'VSORRES',
      'VSORRESU',
      'VSDTC',
    ],
  };
  if (
    domains.length !== 6 ||
    variables.length !== 44 ||
    articles.length !== 8 ||
    glossary.length !== 24 ||
    examples.length !== 3
  )
    throw new Error('Content inventory mismatch');
  for (const [label, values] of Object.entries({
    domain: domains.map((d) => d.code),
    variable: variables.map((v) => v.id),
    article: articles.map((a) => a.slug),
    glossary: glossary.map((g) => g.slug),
    source: sources.map((s) => s.id),
  }))
    unique(values, label);
  const articleIds = new Set(articles.map((a) => a.slug));
  checkSources(profile.sourceIds);
  for (const d of domains) {
    for (const slug of d.articleSlugs)
      if (!articleIds.has(slug)) throw Error('Missing domain article');
    if (JSON.stringify(d.variableNames) !== JSON.stringify(inventory[d.code]))
      throw new Error(`Domain inventory ${d.code}`);
    checkSources(d.sourceRefs.map((r) => r.sourceId));
    for (const name of d.variableNames)
      if (!variables.some((v) => v.domainCode === d.code && v.name === name))
        throw new Error('Missing variable');
    for (const id of d.exampleIds)
      if (!examples.some((e) => e.id === id))
        throw new Error('Missing example');
  }
  for (const v of variables) {
    if (
      v.id !== `${profile.id}:${v.domainCode}:${v.name}` ||
      v.slug !== v.name.toLowerCase()
    )
      throw Error('Variable identity mismatch');
    checkSources(v.sourceRefs.map((r) => r.sourceId));
    if (
      v.exampleJsonType !==
      (v.exampleValue === null ? 'null' : typeof v.exampleValue)
    )
      throw new Error('Example type mismatch');
    if (!inventory[v.domainCode]?.includes(v.name))
      throw new Error('Unexpected variable');
    for (const slug of v.relatedArticleSlugs)
      if (!articleIds.has(slug)) throw new Error('Missing related article');
  }
  for (const g of glossary) {
    checkSources(g.sourceIds);
    if (!articleIds.has(g.article)) throw new Error('Missing glossary article');
  }
  for (const a of articles) {
    checkSources(a.sources);
    for (const slug of a.related)
      if (!articleIds.has(slug))
        throw new Error('Missing article relationship');
    if (
      a.body.split(/\s+/).length < 450 ||
      !a.body.includes('## Engineering pitfall') ||
      !a.body.includes('## ')
    )
      throw new Error(`Incomplete article ${a.slug}`);
    await compile(a.body, { remarkPlugins: [restrictMdx] });
  }
  for (const e of examples) validateExample(e);
  return {
    articles: articles.length,
    domains: domains.length,
    variables: variables.length,
    glossary: glossary.length,
    examples: examples.length,
  };
}
export function validateExample(e: (typeof examples)[number]) {
  const counts: Record<string, number> = {
    'subject-identity': 2,
    'vital-signs-rows': 4,
    'adverse-events-timing': 2,
  };
  if (e.output.length !== counts[e.id])
    throw Error('Fixed example inventory mismatch');
  if (
    e.id !== e.manifest.id ||
    JSON.stringify(e.limitations) !== JSON.stringify(e.manifest.limitations)
  )
    throw Error('Manifest context mismatch');
  unique(
    e.manifest.mappings.map((m) => m.outputField),
    'mapped field',
  );
  if (
    JSON.stringify([...e.columns].sort()) !==
    JSON.stringify(e.manifest.mappings.map((m) => m.outputField).sort())
  )
    throw Error('Incomplete mappings');
  if (
    e.output.length !== e.manifest.expectedRowCount ||
    e.input.length !== e.output.length ||
    e.manifest.traceLinks.length !== e.output.length
  )
    throw new Error('Example row-count mismatch');
  unique(
    e.input.map((r) => String(r.id)),
    'input identity',
  );
  unique(
    e.manifest.traceLinks.map((t) => t.outputRowId),
    'output trace',
  );
  if (JSON.stringify(e.columns) !== JSON.stringify(e.manifest.columnOrder))
    throw new Error('Column order mismatch');
  for (const [i, row] of e.output.entries()) {
    if (e.manifest.traceLinks[i].outputRowId !== `${e.id}:${i + 1}`)
      throw Error('Output trace identity mismatch');
    if (JSON.stringify(Object.keys(row)) !== JSON.stringify(e.columns))
      throw new Error('Unexpected example fields');
    if (e.manifest.traceLinks[i].inputRowId !== e.input[i].id)
      throw new Error('Broken trace link');
    for (const m of e.manifest.mappings) {
      const value = row[m.outputField];
      if (
        value !== null &&
        typeof value !== e.manifest.exampleFieldTypes[m.outputField]
      )
        throw Error('Example field type mismatch');
      if (m.inputPath === '(not collected)' && value !== null)
        throw Error('Missing value fabricated');
      const sequence = e.output
        .slice(0, i + 1)
        .filter((r) => r.USUBJID === row.USUBJID).length;
      if (
        m.inputPath === '(authored)' &&
        value !== (m.outputField === 'DOMAIN' ? e.domain : sequence)
      )
        throw Error('Authored constant mismatch');
      if (
        !m.inputPath.startsWith('(') &&
        row[m.outputField] !== e.input[i][m.inputPath]
      )
        throw new Error('Mapping changed source value');
    }
  }
  toCsv(e.columns, e.output);
}
