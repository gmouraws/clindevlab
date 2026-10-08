import raw from '../data/authored/catalog.json' with { type: 'json' };
import rawExamples from '../data/authored/examples.json' with { type: 'json' };
import rawGlossary from '../data/authored/glossary.json' with { type: 'json' };
import rawSources from '../data/provenance/sources.json' with { type: 'json' };
import rawProfile from '../data/provenance/profile.json' with { type: 'json' };
import {
  domainSchema,
  variableSchema,
  exampleSchema,
  glossarySchema,
  sourceSchema,
  profileSchema,
} from './schema';

export const domains = raw.domains
  .map((d) => domainSchema.parse(d))
  .sort((a, b) => a.code.localeCompare(b.code));
export const variables = raw.variables.map((v) => variableSchema.parse(v));
export const examples = rawExamples.map((e) => exampleSchema.parse(e));
export const glossary = rawGlossary.map((g) => glossarySchema.parse(g));
export const sources = rawSources.map((s) => sourceSchema.parse(s));
export const profile = profileSchema.parse(rawProfile);
export const BASE = '/explore/sdtm/2-0/ig/3-4/';
export const domainUrl = (code: string) =>
  `${BASE}domains/${code.toLowerCase()}/`;
export const variableUrl = (domain: string, name: string) =>
  `${domainUrl(domain)}variables/${name.toLowerCase()}/`;
export const downloadBase = (id: string) => `/examples-data/1.0.0/${id}/`;
export function toCsv(
  columns: string[],
  rows: Record<string, string | number | null>[],
) {
  const csvEscape = (value: string | number | null) => {
    const str = value === null ? '' : String(value);
    if (/^[=+@\-\t\r]/.test(str))
      throw new Error('Unsafe CSV formula-leading value');
    return /[",\r\n]/.test(str) ? `"${str.replaceAll('"', '""')}"` : str;
  };
  return (
    [
      columns.map(csvEscape).join(','),
      ...rows.map((row) => columns.map((key) => csvEscape(row[key])).join(',')),
    ].join('\r\n') + '\r\n'
  );
}
