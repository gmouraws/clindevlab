export type SearchRecord = {
  id: string;
  url: string;
  kind: string;
  title: string;
  codes: string[];
  domain: string | null;
  summary: string;
  keywords: string[];
  profile: string | null;
};
const normalize = (s: string) => s.normalize('NFKC').toLowerCase().trim();
export function search(
  records: SearchRecord[],
  query: string,
  kind = '',
  domain = '',
) {
  const q = normalize(query.slice(0, 120));
  if (!q) return [];
  const tokens = q.split(/\s+/);
  const order = [
    'domain',
    'variable',
    'article',
    'example',
    'glossary',
    'terminology',
  ];
  return records
    .filter(
      (r) =>
        (!kind || r.kind === kind) &&
        (!domain || r.domain?.toLowerCase() === domain),
    )
    .map((r) => {
      const codes = r.codes.map(normalize),
        title = normalize(r.title),
        keys = r.keywords.map(normalize),
        summary = normalize(r.summary);
      const scores = tokens.map((t) =>
        codes.includes(t)
          ? 100
          : codes.some((c) => c.startsWith(t))
            ? 60
            : title === t
              ? 40
              : title.includes(t)
                ? 20
                : keys.some((k) => k.includes(t))
                  ? 10
                  : summary.includes(t)
                    ? 3
                    : 0,
      );
      return {
        r,
        exact: codes.includes(q) ? 1 : 0,
        score: scores.every(Boolean)
          ? scores.reduce<number>((a, b) => a + b, 0)
          : 0,
      };
    })
    .filter((x) => x.score > 0)
    .sort(
      (a, b) =>
        b.exact - a.exact ||
        b.score - a.score ||
        order.indexOf(a.r.kind) - order.indexOf(b.r.kind) ||
        a.r.title.localeCompare(b.r.title) ||
        a.r.url.localeCompare(b.r.url),
    )
    .map((x) => x.r);
}
export function parseState(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const allowed = (key: string, options: string[]) =>
    options.includes(params.get(key) || '') ? params.get(key) || '' : '';
  return {
    q: (params.get('q') || '').slice(0, 120),
    kind: allowed('kind', [
      'article',
      'domain',
      'variable',
      'example',
      'glossary',
      'terminology',
    ]),
    domain: allowed('domain', ['dm', 'ae', 'cm', 'ex', 'lb', 'vs']),
    class: allowed('class', [
      'findings',
      'events',
      'interventions',
      'special-purpose',
    ]),
  };
}
