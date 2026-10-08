import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import {
  Breadcrumbs,
  Note,
  PageHeader,
  Sources,
  VersionStrip,
} from '../../components/editorial';
import {
  CodeView,
  DatasetView,
  DomainExplorer,
  SearchPanel,
} from '../../components/interactive';
import {
  BASE,
  domains,
  variables,
  examples,
  glossary,
  sources,
  domainUrl,
  variableUrl,
  downloadBase,
  toCsv,
} from '../../lib/data';
import { readArticles, renderArticle } from '../../lib/content';
import { routes, titleFor } from '../../lib/routes';
import { ThirdPartyLicenses } from '../../components/licenses';
import { pageMetadata } from '../../lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return routes()
    .filter((r) => r !== '/')
    .map((r) => ({ slug: r.split('/').filter(Boolean) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const path = `/${(await params).slug.join('/')}/`;
  const info = titleFor(path);
  return pageMetadata(path, info.title, info.description);
}
const unavailable = (
  <Note title="Official metadata is not bundled">
    <p>
      Selected teaching explanations and example values, not a complete domain
      specification. See{' '}
      <a href="/reference/standards-and-versions/">
        standards, versions and coverage
      </a>{' '}
      for official metadata and terminology limitations.
    </p>
  </Note>
);
function VariableTable({ code }: { code?: string }) {
  const selected = variables.filter((v) => !code || v.domainCode === code);
  return (
    <DatasetView
      caption={
        code
          ? `${code} selected variable lessons`
          : 'All selected variable lessons'
      }
      columns={[
        'Identifier',
        'Domain',
        'Teaching explanation',
        'Example JSON type',
        'Example value',
      ]}
      rows={selected.map((v) => ({
        Identifier: v.name,
        Domain: v.domainCode,
        'Teaching explanation': v.explanation,
        'Example JSON type': v.exampleJsonType,
        'Example value': v.exampleValue,
      }))}
      links={Object.fromEntries(
        selected.map((v) => [
          code ? v.name : `${v.domainCode}:${v.name}`,
          variableUrl(v.domainCode, v.name),
        ]),
      )}
    />
  );
}
function Related({ slugs }: { slugs: string[] }) {
  const articles = readArticles();
  return (
    <section className="related">
      <h2>Keep exploring</h2>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <a href={`/learn/${slug}/`}>
              {articles.find((a) => a.slug === slug)?.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = `/${(await params).slug.join('/')}/`;
  if (!routes().includes(path)) notFound();
  const info = titleFor(path),
    articles = readArticles();
  const article = articles.find((a) => path === `/learn/${a.slug}/`);
  if (article) {
    const Content = await renderArticle(article.body);
    return (
      <div className="page-shell">
        <Breadcrumbs
          items={[
            { label: 'Learn', href: '/learn/' },
            { label: article.title },
          ]}
        />
        <div className="article-layout">
          <aside className="learning-nav">
            <details open>
              <summary>In this learning path</summary>
              <ol>
                {articles.map((a) => (
                  <li key={a.slug}>
                    <a
                      aria-current={
                        a.slug === article.slug ? 'page' : undefined
                      }
                      href={`/learn/${a.slug}/`}
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </aside>
          <article className="article">
            <PageHeader
              kicker={`Learn / ${String(article.order).padStart(2, '0')} of 08`}
              title={article.title}
              description={article.description}
            />
            <div className="learning-objective">
              <p>
                <strong>Your objective</strong>
                <br />
                {article.objective}
              </p>
              <p>
                <strong>Before you begin</strong>
                <br />
                {article.prerequisites}
              </p>
            </div>
            <div className="prose">
              <Content
                components={{
                  h2: ({ children }) => (
                    <h2
                      id={String(children)
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')}
                    >
                      {children}
                    </h2>
                  ),
                  pre: ({ children }) => (
                    <CodeView
                      label="Authored illustration"
                      text={String(
                        (children as ReactElement<{ children: string }>).props
                          .children,
                      )}
                    />
                  ),
                }}
              />
            </div>
            <Related slugs={article.related} />
            <Sources ids={article.sources} />
          </article>
        </div>
      </div>
    );
  }
  const domain = domains.find((d) => path === domainUrl(d.code));
  if (domain)
    return (
      <div className="page-shell">
        <Breadcrumbs
          items={[
            { label: 'Explore', href: '/explore/' },
            { label: 'SDTM 2.0 / IG 3.4', href: BASE },
            { label: domain.code },
          ]}
        />
        <VersionStrip />
        <PageHeader
          kicker={`${domain.code} / ${domain.class}`}
          title={domain.teachingTitle}
          description={domain.summary}
        />
        <div className="domain-intro" id="overview">
          <div>
            <h2>{domain.heading}</h2>
            <p>{domain.explanation}</p>
          </div>
          <aside className="grain">
            <p className="eyebrow">What one row means</p>
            <p>{domain.recordGranularityExplanation}</p>
          </aside>
        </div>
        <section id="variables">
          <h2>Look inside the structure</h2>
          <p>
            {domain.variableNames.length} selected variables. Follow an
            identifier to its lesson.
          </p>
          {unavailable}
          <VariableTable code={domain.code} />
        </section>
        <Note title="Engineering pitfall">
          <p>{domain.pitfall}</p>
        </Note>
        <section id="examples">
          <h2>See the relationship in an example</h2>
          {domain.exampleIds.map((id) => (
            <p key={id}>
              <a href={`/examples/${id}/`}>
                {examples.find((e) => e.id === id)?.title} →
              </a>
            </p>
          ))}
          {!['DM', 'AE', 'VS'].includes(domain.code) && (
            <p>
              This linked walkthrough illustrates a related engineering concept;
              it is not an {domain.code} output dataset.
            </p>
          )}
        </section>
        <Related slugs={domain.articleSlugs} />
        <Sources />
      </div>
    );
  const variable = variables.find(
    (v) => path === variableUrl(v.domainCode, v.name),
  );
  if (variable)
    return (
      <div className="page-shell narrow">
        <Breadcrumbs
          items={[
            { label: 'Explore', href: '/explore/' },
            { label: 'SDTM 2.0 / IG 3.4', href: BASE },
            {
              label: variable.domainCode,
              href: domainUrl(variable.domainCode),
            },
            { label: variable.name },
          ]}
        />
        <VersionStrip />
        <PageHeader
          kicker={`${variable.domainCode} / Variable lesson`}
          title={variable.name}
          description={variable.teachingTitle}
        />
        <p className="lead-copy">{variable.explanation}</p>
        <dl className="metadata">
          <div>
            <dt>Domain context</dt>
            <dd>
              <a href={domainUrl(variable.domainCode)}>{variable.domainCode}</a>
            </dd>
          </div>
          <div>
            <dt>Example JSON type</dt>
            <dd>{variable.exampleJsonType} — authored example only</dd>
          </div>
          <div>
            <dt>Example value</dt>
            <dd>
              <code>
                {variable.exampleValue === null
                  ? 'null (missing)'
                  : String(variable.exampleValue)}
              </code>
            </dd>
          </div>
          <div>
            <dt>Official label / type / role / core</dt>
            <dd>Not bundled. No official values inferred.</dd>
          </div>
          <div>
            <dt>Controlled terminology binding</dt>
            <dd>Not bundled. No verified binding asserted.</dd>
          </div>
          <div>
            <dt>Authorship and review</dt>
            <dd>Original ClinDevLab lesson · {variable.reviewedAt}</dd>
          </div>
        </dl>
        <p className="fine">
          <a href="/reference/standards-and-versions/">
            About these metadata limitations →
          </a>
        </p>
        <Note title="Engineering pitfall">
          <p>{variable.pitfall}</p>
        </Note>
        <section id="examples">
          <h2>Inspect the surrounding context</h2>
          <p>
            <a href={domainUrl(variable.domainCode)}>
              Return to the {variable.domainCode} domain and its related example
              →
            </a>
          </p>
        </section>
        <Related slugs={variable.relatedArticleSlugs} />
        <Sources />
      </div>
    );
  const example = examples.find((e) => path === `/examples/${e.id}/`);
  if (example) {
    const downloads = downloadBase(example.id);
    return (
      <div className="page-shell">
        <Breadcrumbs
          items={[
            { label: 'Examples', href: '/examples/' },
            { label: example.title },
          ]}
        />
        <VersionStrip />
        <PageHeader
          kicker={`Synthetic example / ${example.domain}`}
          title={example.title}
          description={example.summary}
        />
        <Note title="Synthetic data · educational extract">
          <p>
            Every record is invented. Teaching tokens are not verified CDISC
            values. This is not a complete or submission-ready dataset.
          </p>
        </Note>
        <p className="lead-copy">{example.explanation}</p>
        <section>
          <h2>01 / The collection</h2>
          <CodeView
            label="Original synthetic input · JSON"
            text={JSON.stringify(example.input, null, 2)}
          />
        </section>
        <section>
          <h2>02 / The representation</h2>
          <DatasetView
            caption={`${example.domain} synthetic output`}
            columns={example.columns}
            rows={example.output}
          />
          <details className="output-code">
            <summary>Inspect output JSON and CSV</summary>
            <CodeView
              label="Output JSON"
              text={JSON.stringify(example.output, null, 2)}
            />
            <CodeView
              label="Output CSV"
              text={toCsv(example.columns, example.output)}
            />
          </details>
          <div className="downloads">
            {['input.json', 'output.json', 'output.csv', 'manifest.json'].map(
              (file) => (
                <a
                  className="button"
                  key={file}
                  download={`${example.id}-1.0.0-${file}`}
                  href={`${downloads}${file}`}
                >
                  Download {file}
                </a>
              ),
            )}
          </div>
        </section>
        <section>
          <h2>03 / The decisions between them</h2>
          <dl className="mappings">
            {example.manifest.mappings.map((m) => (
              <div key={m.outputField}>
                <dt>
                  <code>
                    {m.inputPath} → {m.outputField}
                  </code>
                </dt>
                <dd>{m.explanation}</dd>
              </div>
            ))}
          </dl>
          <h3>Trace each row</h3>
          <ul>
            {example.manifest.traceLinks.map((t) => (
              <li key={t.outputRowId}>
                <code>{t.inputRowId}</code> → <code>{t.outputRowId}</code>
              </li>
            ))}
          </ul>
          <p>{example.manifest.nullConvention}</p>
        </section>
        <Note title="What this example does not establish">
          <ul>
            {example.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Note>
        <section>
          <h2>Read the variable lessons</h2>
          <div className="browse-links">
            {example.columns.map((name) => (
              <a key={name} href={variableUrl(example.domain, name)}>
                {name}
              </a>
            ))}
          </div>
        </section>
        <Sources />
      </div>
    );
  }
  let content: ReactNode;
  if (path === '/learn/')
    content = (
      <>
        <p className="lead-copy">
          A practical sequence for developers. Start with context, then follow a
          value into a row.
        </p>
        <ol className="lesson-list">
          {articles.map((a) => (
            <li key={a.slug}>
              <span className="step-number">
                {String(a.order).padStart(2, '0')}
              </span>
              <div>
                <h2>
                  <a href={`/learn/${a.slug}/`}>{a.title}</a>
                </h2>
                <p>{a.description}</p>
                <p className="fine">{a.objective}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </>
    );
  else if (path === BASE)
    content = (
      <>
        <VersionStrip />
        <p className="lead-copy">
          Six starting points, not a complete catalog. Each domain connects its
          row structure to selected variable lessons and an engineering
          question.
        </p>
        <DomainExplorer domains={domains} />
      </>
    );
  else if (path === `${BASE}variables/`)
    content = (
      <>
        <VersionStrip />
        {unavailable}
        <div className="variable-index">
          {domains.map((d) => (
            <section key={d.code}>
              <h2>
                <a href={domainUrl(d.code)}>
                  {d.code} · {d.teachingTitle}
                </a>
              </h2>
              <ul>
                {variables
                  .filter((v) => v.domainCode === d.code)
                  .map((v) => (
                    <li key={v.id}>
                      <a href={variableUrl(v.domainCode, v.name)}>{v.name}</a>
                      <span>{v.teachingTitle}</span>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </>
    );
  else if (path === '/search/') content = <SearchPanel />;
  else if (path === '/explore/')
    content = (
      <>
        <div className="explore-feature">
          <span className="domain-code">SDTM</span>
          <div>
            <h2>Find meaning in the structure</h2>
            <p>
              Start with the subject, event, treatment or measurement behind a
              row. Explore the selected 2.0 / 3.4 teaching profile.
            </p>
            <a className="button primary" href={BASE}>
              Explore six domains →
            </a>
          </div>
        </div>
        <div className="resource-list">
          <a href={`${BASE}variables/`}>
            <h2>44 variable lessons</h2>
            <p>Identifiers, values and common modeling mistakes.</p>
          </a>
          <a href="/explore/terminology/">
            <h2>Terminology references</h2>
            <p>Understand vocabulary context and follow official sources.</p>
          </a>
          <a href="/examples/">
            <h2>Synthetic walkthroughs</h2>
            <p>Trace original input into inspectable rows.</p>
          </a>
        </div>
      </>
    );
  else if (path === '/explore/sdtm/')
    content = (
      <>
        <p>
          Choose an explicit teaching context. This edition supports one
          profile; it does not silently redirect to a changing “latest” release.
        </p>
        <VersionStrip />
        <p>
          <a className="button primary" href={BASE}>
            Model 2.0 / IG 3.4 →
          </a>
        </p>
        <p>
          <a href="/reference/standards-and-versions/">
            Read the version policy
          </a>
        </p>
      </>
    );
  else if (path === '/examples/')
    content = (
      <>
        <p className="lead-copy">
          Small enough to inspect. Explicit enough to question. All records are
          independently invented; none are derived from real participants.
        </p>
        <ol className="lesson-list">
          {examples.map((e, i) => (
            <li key={e.id}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <p className="eyebrow">
                  {e.domain} · {e.output.length} synthetic rows
                </p>
                <h2>
                  <a href={`/examples/${e.id}/`}>{e.title}</a>
                </h2>
                <p>{e.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </>
    );
  else if (path === '/explore/terminology/')
    content = (
      <div className="prose">
        <p>
          A codelist, a term concept and a submission value are different pieces
          of information. A familiar label alone cannot tell you which list or
          release applies to a variable.
        </p>
        <h2>Links-only in this edition</h2>
        <p>
          No controlled terminology package is bundled. The fictional DEMO_A,
          DEMO_B and DEMO_UNIT tokens used in examples are explicitly authored
          teaching values, not verified CDISC terminology. No codelist IDs or
          variable bindings are guessed.
        </p>
        <h2>How to approach an official vocabulary</h2>
        <ol>
          <li>Identify the applicable list and dated release.</li>
          <li>Distinguish a concept ID from its output representation.</li>
          <li>Verify membership and extensibility in that release.</li>
          <li>
            Record source, terms and attribution before redistributing anything.
          </li>
        </ol>
        <p>
          <a href="/learn/controlled-terminology/">
            Read the terminology lesson →
          </a>
        </p>
        <Sources ids={['nci', 'library']} />
      </div>
    );
  else if (path === '/reference/glossary/')
    content = (
      <>
        <p>
          Twenty-four original explanations for working developers. These are
          teaching notes, not copied official glossary definitions.
        </p>
        <div className="glossary">
          {glossary.map((g) => (
            <section key={g.slug} id={g.slug}>
              <p className="eyebrow">{g.slug.replaceAll('-', ' ')}</p>
              <h2>{g.title}</h2>
              <p>{g.explanation}</p>
              <a href={`/learn/${g.article}/`}>Read in context →</a>
            </section>
          ))}
        </div>
        <Sources />
      </>
    );
  else if (path === '/reference/resources/' || path === '/reference/sources/')
    content = (
      <>
        <p className="lead-copy">
          Go to the publisher for authoritative material. These references
          support learning; access does not automatically grant redistribution
          rights.
        </p>
        <div className="source-register">
          {sources.map((s) => (
            <section id={s.id} key={s.id}>
              <p className="eyebrow">{s.publisher} / Reference only</p>
              <h2>
                <a href={s.url}>{s.title}</a>
              </h2>
              <dl className="metadata">
                <div>
                  <dt>Version / published</dt>
                  <dd>
                    {s.sourceVersion || 'Not versioned here'} /{' '}
                    {s.publicationDate || 'Publication date not verified'}
                  </dd>
                </div>
                <div>
                  <dt>Accessed / reviewed</dt>
                  <dd>{s.accessedAt}</dd>
                </div>
                <div>
                  <dt>Use in ClinDevLab</dt>
                  <dd>{s.restrictions}</dd>
                </div>
                <div>
                  <dt>Redistribution assessment</dt>
                  <dd>
                    {s.permission}; this edition uses links only.{' '}
                    {s.termsUrl && <a href={s.termsUrl}>Publisher terms</a>}
                  </dd>
                </div>
              </dl>
            </section>
          ))}
        </div>
        <Note title="Original content, explicit limits">
          <p>
            Explanations and examples are independently authored for this
            project. No standards tables, API responses, external sample studies
            or dictionary entries are distributed. The project's outbound
            content license remains undecided before public publication.
          </p>
        </Note>
      </>
    );
  else if (path === '/reference/standards-and-versions/')
    content = (
      <div className="prose">
        <VersionStrip />
        <h2>Four dimensions, different jobs</h2>
        <dl className="metadata">
          <div>
            <dt>SDTM model 2.0</dt>
            <dd>The conceptual model used as a teaching context.</dd>
          </div>
          <div>
            <dt>SDTMIG 3.4</dt>
            <dd>The separately identified implementation guide context.</dd>
          </div>
          <div>
            <dt>Terminology release</dt>
            <dd>None bundled. Links-only mode; no CT compliance claimed.</dd>
          </div>
          <div>
            <dt>Content 1.0.0</dt>
            <dd>
              The version of ClinDevLab's original explanations and synthetic
              fixtures.
            </dd>
          </div>
        </dl>
        <h2>Curated does not mean complete</h2>
        <p>
          Six domains and 44 selected variable lessons introduce useful
          engineering questions. They do not reconstruct official domain
          specifications. Example JSON types describe our examples, not
          normative SDTM types.
        </p>
        <h2>Corrections and stable references</h2>
        <p>
          Version-specific domain URLs remain explicit. Material corrections
          require a documented content revision and review of the source trail;
          a future release must not silently overwrite this teaching profile.
          Source access dates record when information was inspected, not a
          promise of current regulatory applicability.
        </p>
        <h2>Education is not validation</h2>
        <p>
          Example checks establish internal consistency only. Regulatory
          suitability depends on the actual submission context and authoritative
          requirements. Consult official sources and qualified reviewers for
          those decisions.
        </p>
        <Sources ids={['sdtm', 'ig', 'fda']} />
      </div>
    );
  else if (path === '/about/')
    content = (
      <div className="prose">
        <p>
          ClinDevLab is an independent educational product. It helps software
          engineers understand clinical research data structures through
          original explanations and inspectable synthetic examples.
        </p>
        <h2>Built around questions developers ask</h2>
        <p>
          What does one row mean? Which identifier joins these records? Does a
          missing date justify a default? The field guide connects these
          questions to selected SDTM concepts without presenting itself as an
          official standards database.
        </p>
        <h2>An independent visual and technical identity</h2>
        <p>
          This product uses its own editorial layout, scientific data exhibits
          and typography. Its curriculum, examples and visual identity are
          developed independently for clinical software engineering education.
        </p>
        <h2>Scope and review</h2>
        <p>
          No CDISC, NCI or FDA endorsement or certification is implied. Content
          is educational and has not been represented as qualified clinical
          review. The application accepts no real study data and performs no
          clinical or regulatory validation.
        </p>
        <a href="/reference/sources/">Inspect the source trail →</a>
        <h2>Created by Guilherme Moura</h2>
        <p>
          Guilherme Moura is a Brazilian software engineer with 14+ years of
          experience building software and enterprise applications. ClinDevLab
          grew from his interest in the intersection of software engineering,
          clinical research, and structured clinical data.
        </p>
        <p>
          <a href="https://www.linkedin.com/in/guilherme-moura16">LinkedIn</a>
          {' · '}
          <a href="https://github.com/gmouraws">GitHub</a>
          {' · '}
          <a href="https://blueprint.app.br/">Blueprint Engineering Lab</a>
        </p>
      </div>
    );
  else if (path === '/legal/third-party-licenses/')
    content = <ThirdPartyLicenses />;
  else if (path === '/legal/')
    content = (
      <div className="prose">
        <p>
          Find the policies and attribution information behind this independent
          educational resource.
        </p>
        <ul>
          <li>
            <a href="/privacy/">Privacy</a> — local search, browser history and
            external links.
          </li>
          <li>
            <a href="/legal/third-party-licenses/">Third-party licenses</a> —
            software acknowledgments and complete license texts.
          </li>
          <li>
            <a href="/reference/standards-and-versions/">
              Standards and versions
            </a>{' '}
            — coverage, unavailable metadata and educational limitations.
          </li>
          <li>
            <a href="/reference/sources/">Sources and provenance</a> — publisher
            links and attribution for the learning material.
          </li>
        </ul>
        <h2>Original material</h2>
        <p>
          No public reuse license has been selected for original ClinDevLab code
          or content. Third-party software retains its own licenses; those
          licenses do not grant rights to ClinDevLab’s original material.
        </p>
      </div>
    );
  else if (path === '/privacy/')
    content = (
      <div className="prose">
        <h2>A reading tool, not a data collection tool</h2>
        <p>
          ClinDevLab has no accounts, uploads, comments, analytics SDKs, session
          recording or advertising. Its examples are invented; please do not
          enter patient information into search or share it through URLs.
        </p>
        <h2>Search stays local</h2>
        <p>
          Search uses a static index in your browser. Query text lives in the
          URL fragment and is not sent to a search service or stored by this
          application. If you copy a URL, its fragment may be visible to its
          recipient or retained in your browser history.
        </p>
        <h2>Requests and external links</h2>
        <p>
          Your browser requests static files from the host. A future hosting
          provider may retain request or IP logs; provider retention settings
          have not been verified for a public deployment. Following an external
          source link takes you to that publisher's site and its own policies.
        </p>
        <h2>Local preview status</h2>
        <p>
          This release candidate is prepared for local review. Production
          hosting and privacy settings must be checked before public
          publication. No blanket legal-compliance certification is claimed.
        </p>
      </div>
    );
  else notFound();
  return (
    <div
      className={`page-shell ${['/privacy/', '/about/'].includes(path) || path.startsWith('/legal/') ? 'narrow' : ''}`}
    >
      <Breadcrumbs
        items={[
          ...(path.startsWith('/legal/') && path !== '/legal/'
            ? [{ label: 'Privacy & legal', href: '/legal/' }]
            : []),
          { label: info.title },
        ]}
      />
      <PageHeader
        kicker={
          path.startsWith('/legal/')
            ? 'Legal information'
            : path.startsWith('/reference')
              ? 'Reference'
              : path.startsWith('/learn')
                ? 'The learning path'
                : path.startsWith('/examples')
                  ? 'Synthetic field notes'
                  : 'The field guide'
        }
        title={info.title}
        description={
          path === '/search/'
            ? 'Search ideas, domains and selected variables.'
            : ''
        }
      />
      {content}
    </div>
  );
}
