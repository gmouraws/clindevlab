import { describe, it, expect } from 'vitest';
import { search, parseState } from '../../lib/search';
import { searchIndex } from '../../lib/index';
describe('local identifier-aware search', () => {
  const index = searchIndex();
  it('places exact code matches first and keeps all six contexts', () => {
    expect(search(index, 'AESEQ')[0].title).toBe('AESEQ · AE');
    expect(
      search(index, 'usubjid')
        .slice(0, 6)
        .map((r) => r.domain)
        .sort(),
    ).toEqual(['ae', 'cm', 'dm', 'ex', 'lb', 'vs']);
  });
  it('combines filters and requires all tokens', () => {
    expect(search(index, 'USUBJID', 'variable', 'dm')).toHaveLength(1);
    expect(search(index, 'zzzz nowhere')).toHaveLength(0);
    expect(search(index, '')).toEqual([]);
    expect(search(index, '   ')).toEqual([]);
  });
  it('treats punctuation and script strings literally', () => {
    expect(() => search(index, '[.*(')).not.toThrow();
    expect(search(index, '<script>')).toEqual([]);
  });
  it('caps query length, ignores unsupported filters and handles bad encoding', () => {
    expect(parseState('#q=' + 'a'.repeat(200)).q).toHaveLength(120);
    expect(parseState('#kind=unsafe&domain=xx').domain).toBe('');
    expect(() => parseState('#q=%E0%A4%A')).not.toThrow();
  });
  it('is stable and responds within the local warm-query budget', () => {
    const times = [];
    for (let i = 0; i < 100; i++) {
      const start = performance.now();
      search(index, ['AESEQ', 'subject', 'missing date', 'USUBJID'][i % 4]);
      times.push(performance.now() - start);
    }
    times.sort((a, b) => a - b);
    expect(times[94]).toBeLessThan(100);
    console.log('Search p95 ms:', times[94]);
    expect(search(index, 'subject')).toEqual(search(index, 'subject'));
  });
});
