import { describe, it, expect } from 'vitest';
import { compile } from '@mdx-js/mdx';
import {
  validateContent,
  validateExample,
  unique,
  checkSources,
} from '../../lib/validate';
import { examples, toCsv, sources, variables } from '../../lib/data';
import { restrictMdx } from '../../lib/content';
import {
  variableSchema,
  profileSchema,
  requireBundlePermission,
} from '../../lib/schema';
import profile from '../../data/provenance/profile.json';
describe('publication boundaries', () => {
  it('rejects missing sources, release mismatches and invented codelist bindings', () => {
    expect(() => checkSources(['missing-source'])).toThrow();
    expect(() =>
      profileSchema.parse({ ...profile, igVersion: '3.3' }),
    ).toThrow();
    expect(() =>
      variableSchema.parse({ ...variables[0], codelistId: 'invented' }),
    ).toThrow();
  });
  it('rejects incomplete mappings and fabricated constants', () => {
    const e = structuredClone(examples[0]);
    e.manifest.mappings.pop();
    expect(() => validateExample(e)).toThrow();
    const f = structuredClone(examples[0]);
    f.output[0].DOMAIN = 'AE';
    expect(() => validateExample(f)).toThrow();
  });
  it('validates the full fixed curriculum and original fixtures', async () => {
    expect(await validateContent()).toEqual({
      articles: 8,
      domains: 6,
      variables: 44,
      glossary: 24,
      examples: 3,
    });
  });
  it('rejects invented official core metadata', () => {
    expect(() =>
      variableSchema.parse({
        ...variables[0],
        officialMetadata: { core: 'Permissible' },
      }),
    ).toThrow();
  });
  it('rejects uncertain redistribution and link-only sources', () => {
    for (const source of sources)
      expect(() => requireBundlePermission(source)).toThrow();
  });
  it('rejects a fabricated CT release in links-only mode', () => {
    expect(() =>
      profileSchema.parse({ ...profile, ctRelease: '2026-09-25' }),
    ).toThrow();
  });
  it('rejects duplicate identities', () => {
    expect(() => unique(['same', 'same'], 'record')).toThrow();
  });
  it.each([
    'import X from "secret"\n\n# Hi',
    '<script>alert(1)</script>',
    '{process.env.SECRET}',
    '[click](javascript:alert)',
    '![remote](https://example.com/a.png)',
  ])('rejects executable/unapproved MDX: %s', async (body) => {
    await expect(
      compile(body, { remarkPlugins: [restrictMdx] }),
    ).rejects.toThrow();
  });
  it('rejects forged trace identities and lost date precision', () => {
    const e = structuredClone(examples[2]);
    e.output[1].AESTDTC = '2025-02-01';
    expect(() => validateExample(e)).toThrow();
    const f = structuredClone(examples[0]);
    f.manifest.traceLinks[0].inputRowId = 'missing';
    expect(() => validateExample(f)).toThrow();
  });
  it('preserves null and partial dates and quotes CSV fields', () => {
    expect(examples[2].output[1].AEENDTC).toBeNull();
    expect(examples[2].output[1].AESTDTC).toBe('2025-02');
    expect(toCsv(['x'], [{ x: 'a,"b"' }])).toBe('x\r\n"a,""b"""\r\n');
    expect(() => toCsv(['x'], [{ x: '=1+1' }])).toThrow();
  });
});
