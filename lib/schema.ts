import { z } from 'zod';

const text = z.string().min(1);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const https = z
  .string()
  .url()
  .refine((v) => v.startsWith('https://'));
const ref = z.strictObject({ sourceId: text, locator: text, claimScope: text });
export const sourceSchema = z.strictObject({
  id: text,
  publisher: text,
  title: text,
  url: https,
  sourceVersion: text.nullable(),
  publicationDate: date.nullable(),
  accessedAt: date,
  termsUrl: https.nullable(),
  permission: z.enum(['original', 'permitted', 'prohibited', 'uncertain']),
  approvedUses: z.array(z.enum(['link', 'bundle', 'quote'])),
  restrictions: text,
  attribution: text,
  reviewedAt: date,
  evidenceNote: text,
});
export const profileSchema = z.strictObject({
  id: z.literal('sdtm-2-0_ig-3-4'),
  modelVersion: z.literal('2.0'),
  igVersion: z.literal('3.4'),
  contentVersion: z.literal('1.0.0'),
  referenceMode: z.literal('authored-only'),
  terminologyMode: z.literal('links-only'),
  ctRelease: z.null(),
  sourceIds: z.array(text).min(1),
  coverageNotice: text,
  reviewedAt: date,
});
export const domainSchema = z.strictObject({
  code: text,
  slug: text,
  teachingTitle: text,
  class: z.enum(['findings', 'events', 'interventions', 'special-purpose']),
  heading: text,
  summary: text,
  recordGranularityExplanation: text,
  explanation: text,
  pitfall: text,
  exampleIds: z.array(text).min(1),
  variableNames: z.array(text).min(1),
  articleSlugs: z.array(text).min(1),
  authorship: z.literal('original'),
  reviewedAt: date,
  sourceRefs: z.array(ref).min(1),
});
export const variableSchema = z.strictObject({
  id: text,
  profileId: z.literal('sdtm-2-0_ig-3-4'),
  domainCode: text,
  name: text,
  slug: text,
  teachingTitle: text,
  explanation: text,
  exampleValue: z.union([text, z.number(), z.null()]),
  exampleJsonType: z.enum(['string', 'number', 'null']),
  pitfall: text,
  sourceRefs: z.array(ref).min(1),
  relatedArticleSlugs: z.array(text).min(1),
  authorship: z.literal('original'),
  officialMetadata: z.null(),
  reviewedAt: date,
});
export const articleSchema = z.strictObject({
  slug: text,
  title: text,
  description: text,
  order: z.number().int().positive(),
  objective: text,
  prerequisites: text,
  keywords: z.array(text),
  related: z.array(text),
  sources: z.array(text).min(1),
  reviewedAt: date,
});
export const glossarySchema = z.strictObject({
  slug: text,
  title: text,
  explanation: text,
  article: text,
  authorship: z.literal('original'),
  reviewedAt: date,
  sourceIds: z.array(text).min(1),
});
const cell = z.union([z.string(), z.number(), z.null()]);
const row = z.record(text, cell);
const manifestSchema = z.strictObject({
  id: text,
  contentVersion: z.literal('1.0.0'),
  synthetic: z.literal(true),
  authorship: z.literal('original'),
  profileId: z.literal('sdtm-2-0_ig-3-4'),
  inputFile: z.literal('input.json'),
  outputJsonFile: z.literal('output.json'),
  outputCsvFile: z.literal('output.csv'),
  expectedRowCount: z.number().int().positive(),
  columnOrder: z.array(text),
  exampleFieldTypes: z.record(text, z.enum(['string', 'number', 'null'])),
  nullConvention: text,
  mappings: z.array(
    z.strictObject({ inputPath: text, outputField: text, explanation: text }),
  ),
  traceLinks: z.array(z.strictObject({ inputRowId: text, outputRowId: text })),
  limitations: z.array(text).min(3),
  ctClaims: z.array(z.never()).length(0),
  reviewedAt: date,
});
export const exampleSchema = z.strictObject({
  id: text,
  title: text,
  summary: text,
  domain: text,
  input: z.array(row),
  columns: z.array(text),
  output: z.array(row),
  limitations: z.array(text).min(3),
  explanation: text,
  manifest: manifestSchema,
});
export type Domain = z.infer<typeof domainSchema>;
export type Variable = z.infer<typeof variableSchema>;
export type ArticleMeta = z.infer<typeof articleSchema>;

export function requireBundlePermission(source: z.infer<typeof sourceSchema>) {
  if (
    !['original', 'permitted'].includes(source.permission) ||
    !source.approvedUses.includes('bundle')
  )
    throw new Error(`Source ${source.id} cannot be bundled`);
}
