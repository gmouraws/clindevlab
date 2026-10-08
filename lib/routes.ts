import {
  BASE,
  domains,
  variables,
  examples,
  domainUrl,
  variableUrl,
} from './data';
import { readArticles } from './content';
export function routes() {
  return [
    '/',
    '/learn/',
    '/explore/',
    '/explore/sdtm/',
    BASE,
    `${BASE}variables/`,
    '/explore/terminology/',
    '/examples/',
    '/reference/glossary/',
    '/reference/resources/',
    '/reference/standards-and-versions/',
    '/reference/sources/',
    '/search/',
    '/about/',
    '/privacy/',
    '/legal/',
    '/legal/third-party-licenses/',
    ...readArticles().map((a) => `/learn/${a.slug}/`),
    ...domains.map((d) => domainUrl(d.code)),
    ...variables.map((v) => variableUrl(v.domainCode, v.name)),
    ...examples.map((e) => `/examples/${e.id}/`),
  ];
}
export function titleFor(path: string) {
  const a = readArticles().find((a) => path === `/learn/${a.slug}/`);
  if (a) return { title: a.title, description: a.description };
  const d = domains.find((d) => path === domainUrl(d.code));
  if (d)
    return { title: `${d.code}: ${d.teachingTitle}`, description: d.summary };
  const v = variables.find((v) => path === variableUrl(v.domainCode, v.name));
  if (v)
    return {
      title: `${v.name} in ${v.domainCode}`,
      description: v.explanation,
    };
  const e = examples.find((e) => path === `/examples/${e.id}/`);
  if (e) return { title: e.title, description: e.summary };
  const titles: Record<string, string> = {
    '/': 'A field guide to clinical data',
    '/learn/': 'Learn the foundations',
    '/explore/': 'Explore clinical data',
    '/explore/sdtm/': 'Choose a teaching profile',
    [BASE]: 'Six domains. A clearer picture.',
    [`${BASE}variables/`]: 'Selected variable lessons',
    '/explore/terminology/': 'Terminology, in context',
    '/examples/': 'Follow the data',
    '/reference/glossary/': 'A working vocabulary',
    '/reference/resources/': 'Official resources',
    '/reference/standards-and-versions/': 'Standards and versions',
    '/reference/sources/': 'Sources and provenance',
    '/search/': 'Find your next connection',
    '/about/': 'About ClinDevLab',
    '/privacy/': 'Privacy by design',
    '/legal/': 'Privacy and legal information',
    '/legal/third-party-licenses/': 'Third-party licenses',
  };
  return {
    title: titles[path] || 'Page not found',
    description: `${titles[path] || 'Page not found'} — independently authored clinical software engineering education.`,
  };
}
