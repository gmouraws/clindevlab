import fs from 'node:fs';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { spawn } from 'node:child_process';

const server = spawn(
  process.execPath,
  ['--import', 'tsx', 'scripts/serve.ts'],
  { stdio: 'pipe' },
);
server.stderr.on('data', (chunk) => process.stderr.write(chunk));
for (let i = 0; i < 50; i++) {
  try {
    if ((await fetch('http://127.0.0.1:4173')).ok) break;
  } catch {}
  if (i === 49) {
    server.kill();
    throw Error('Preview did not start');
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
}

const browser = await chromium.launch({
  headless: true,
  args: ['--remote-debugging-port=9223'],
});
const results = [];
try {
  for (const route of [
    '/',
    '/learn/clinical-trials-for-developers/',
    '/explore/sdtm/2-0/ig/3-4/domains/vs/',
  ]) {
    const runs: Record<
      'performance' | 'accessibility' | 'seo' | 'lcp' | 'cls',
      number
    >[] = [];
    for (let run = 0; run < 3; run++) {
      const result = await lighthouse(`http://127.0.0.1:4173${route}`, {
        port: 9223,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'seo'],
      });
      if (!result) throw Error('No Lighthouse result');
      const { lhr } = result;
      runs.push({
        performance: (lhr.categories.performance.score || 0) * 100,
        accessibility: (lhr.categories.accessibility.score || 0) * 100,
        seo: (lhr.categories.seo.score || 0) * 100,
        lcp: lhr.audits['largest-contentful-paint'].numericValue || 0,
        cls: lhr.audits['cumulative-layout-shift'].numericValue || 0,
      });
      fs.writeFileSync(
        `artifacts/lighthouse-${route === '/' ? 'home' : route.includes('/learn/') ? 'article' : 'domain'}-${run + 1}.json`,
        JSON.stringify(lhr),
      );
    }
    const median = Object.fromEntries(
      Object.keys(runs[0]).map((key) => [
        key,
        runs.map((r) => r[key as keyof typeof r]).sort((a, b) => a - b)[1],
      ]),
    );
    results.push({ route, median, runs });
    console.log({ route, median });
  }
  fs.writeFileSync(
    'artifacts/performance-report.json',
    JSON.stringify(
      {
        lighthouse: '13.5.0',
        browser: browser.version(),
        profile:
          'Lighthouse default simulated mobile, 3 sequential runs per route',
        results,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  server.kill();
}
if (
  results.some(
    (r) =>
      r.median.performance < 90 ||
      r.median.accessibility < 95 ||
      r.median.seo < 95 ||
      r.median.lcp > 2500 ||
      r.median.cls > 0.1,
  )
)
  throw Error('Lab target failed; inspect performance-report.json');
