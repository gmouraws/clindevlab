import { afterEach, expect, it, vi } from 'vitest';
import { pageMetadata } from '../../lib/site';
afterEach(() => vi.unstubAllEnvs());
it('keeps previews unindexed and without production canonical URLs', () => {
  vi.stubEnv('SITE_MODE', 'preview');
  const meta = pageMetadata('/about/', 'About', 'Independent education');
  expect(meta.alternates).toBeUndefined();
  expect(meta.robots).toEqual({ index: false, follow: true });
});
it('uses the approved origin while keeping search unindexed', () => {
  vi.stubEnv('SITE_MODE', 'production');
  vi.stubEnv('SITE_ORIGIN', 'https://clindevlab.com');
  const meta = pageMetadata('/search/', 'Search', 'Find a lesson');
  expect(meta.alternates?.canonical).toBe('https://clindevlab.com/search/');
  expect(meta.openGraph).toMatchObject({
    url: 'https://clindevlab.com/search/',
  });
  expect(meta.robots).toEqual({ index: false, follow: true });
});
it('rejects a mismatched production origin', () => {
  vi.stubEnv('SITE_MODE', 'production');
  vi.stubEnv('SITE_ORIGIN', 'https://example.com');
  expect(() => pageMetadata('/', 'Home', 'Learn')).toThrow();
});
