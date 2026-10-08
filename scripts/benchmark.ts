import fs from 'node:fs';
import os from 'node:os';
import { chromium, firefox, webkit } from '@playwright/test';
import { search } from '../lib/search';
import { searchIndex } from '../lib/index';
const index = searchIndex();
const queries = [
  'AESEQ',
  'USUBJID',
  'missing date',
  'subject',
  'findings',
  'VS',
  '[.*(',
  'not-present',
];
for (let i = 0; i < 20; i++) search(index, queries[i % queries.length]);
const samples = Array.from({ length: 100 }, (_, i) => {
  const start = performance.now();
  search(index, queries[i % queries.length]);
  return performance.now() - start;
}).sort((a, b) => a - b);
const versions: Record<string, string> = {};
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  versions[name] = browser.version();
  await browser.close();
}
const report = {
  node: process.version,
  platform: os.platform(),
  release: os.release(),
  architecture: os.arch(),
  cpu: os.cpus()[0]?.model,
  logicalCpus: os.cpus().length,
  browserVersions: versions,
  playwright: '1.64.0',
  queries: 100,
  warmupQueries: 20,
  p95Milliseconds: samples[94],
  maxMilliseconds: samples[99],
};
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync(
  'artifacts/runtime-and-search.json',
  JSON.stringify(report, null, 2),
);
console.log(report);
if (samples[94] > 100) throw Error('Search p95 exceeds 100ms');
