import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { load } from 'cheerio';
import { routes } from '../lib/routes';
import { examples, toCsv } from '../lib/data';
import { PRODUCTION_ORIGIN } from '../lib/site';
const production = process.env.SITE_MODE === 'production';
const origin = PRODUCTION_ORIGIN;
if (production && process.env.SITE_ORIGIN && process.env.SITE_ORIGIN !== origin)
  throw new Error('Production SITE_ORIGIN must be https://clindevlab.com');
fs.mkdirSync('artifacts', { recursive: true });
const manifest: Record<
  string,
  { sha256: string; headers: Record<string, string> }
> = {};
const failures: string[] = [];
const licenseInventory = JSON.parse(
  fs.readFileSync('out/license-inventory.json', 'utf8'),
);
const noticeText = fs.readFileSync('out/third-party-notices.txt', 'utf8');
const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('hex');
if (
  sha256(noticeText) !== licenseInventory.noticesSha256 ||
  sha256(fs.readFileSync('package-lock.json', 'utf8')) !==
    licenseInventory.lockfileSha256
)
  failures.push('Stale or altered exported license inventory/notices');
for (const notice of licenseInventory.noticeFiles as {
  path: string;
  sha256: string;
}[]) {
  const original = fs.readFileSync(notice.path, 'utf8');
  if (sha256(original) !== notice.sha256 || !noticeText.includes(original))
    failures.push(`Missing or altered license text: ${notice.path}`);
}
const routeList = [...routes(), '/404/'];
const titles = new Set<string>(),
  descriptions = new Set<string>();
let maxJs = 0;
for (const route of routeList) {
  const file =
    route === '/404/' ? 'out/404.html' : path.join('out', route, 'index.html');
  if (!fs.existsSync(file)) throw new Error(`Missing output ${file}`);
  const html = fs.readFileSync(file, 'utf8'),
    $ = load(html);
  const scriptHashes = $('script:not([src])')
    .toArray()
    .map(
      (s) =>
        `'sha256-${createHash('sha256')
          .update($(s).html() || '')
          .digest('base64')}'`,
    );
  const styleHashes = $('style')
    .toArray()
    .map(
      (s) =>
        `'sha256-${createHash('sha256')
          .update($(s).html() || '')
          .digest('base64')}'`,
    );
  const csp = `default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'self' ${[...new Set(scriptHashes)].join(' ')}; style-src 'self' ${[...new Set(styleHashes)].join(' ')};`;
  if (Buffer.byteLength(csp) > 8000) failures.push(`Oversized CSP ${route}`);
  const headers: Record<string, string> = {
    'Content-Security-Policy': csp,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cache-Control': 'public, max-age=0, must-revalidate',
  };
  if (!production || route === '/search/') headers['X-Robots-Tag'] = 'noindex';
  manifest[route] = {
    sha256: createHash('sha256').update(html).digest('hex'),
    headers,
  };
  if (
    route === '/404/' &&
    !$('meta[name=robots]').attr('content')?.includes('noindex')
  )
    failures.push('404 must remain noindex');
  if (route !== '/404/') {
    const title = $('title').text(),
      description = $('meta[name=description]').attr('content') || '';
    if (!title || titles.has(title))
      failures.push(`Duplicate/missing title ${route}`);
    titles.add(title);
    if (!description || descriptions.has(description))
      failures.push(`Duplicate/missing description ${route}`);
    descriptions.add(description);
    if (
      !$('meta[property="og:title"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') !== description ||
      $('meta[property="og:site_name"]').attr('content') !== 'ClinDevLab'
    )
      failures.push(`Open Graph metadata missing/mismatched ${route}`);
    if (
      production &&
      $('meta[property="og:url"]').attr('content') !== `${origin}${route}`
    )
      failures.push(`Open Graph URL mismatch ${route}`);
    if (
      $('link[rel="icon"]').attr('href') !== '/icon.svg' ||
      !fs.existsSync('out/icon.svg')
    )
      failures.push(`Missing application icon ${route}`);
    if (
      (!production || route === '/search/') &&
      !$('meta[name=robots]').attr('content')?.includes('noindex')
    )
      failures.push(`Non-indexable route robots mismatch ${route}`);
    if (!$('main h1').length) failures.push(`Missing heading ${route}`);
    if (
      !production &&
      !$('meta[name=robots]').attr('content')?.includes('noindex')
    )
      failures.push(`Preview indexing ${route}`);
    if (
      production &&
      route !== '/search/' &&
      $('link[rel=canonical]').attr('href') !== new URL(route, origin).href
    )
      failures.push(`Canonical mismatch ${route}`);
  }
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.startsWith('https://')) return;
    if (!href.startsWith('/') && !href.startsWith('#')) {
      failures.push(`Unsafe link ${route}: ${href}`);
      return;
    }
    const url = new URL(href, `https://local.invalid${route}`),
      target = url.pathname;
    const targetFile = target.endsWith('/')
      ? path.join('out', target, 'index.html')
      : path.join('out', target);
    if (!fs.existsSync(targetFile)) {
      failures.push(`Broken link ${route}: ${href}`);
      return;
    }
    if (url.hash) {
      const targetHtml = load(fs.readFileSync(targetFile, 'utf8'));
      if (!targetHtml(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).length)
        failures.push(`Broken anchor ${route}: ${href}`);
    }
  });
  const scripts = new Set(
    $('script[src]')
      .toArray()
      .map((el) => $(el).attr('src') || ''),
  );
  const jsBytes = [...scripts].reduce(
    (sum, src) =>
      sum +
      gzipSync(fs.readFileSync(path.join('out', decodeURIComponent(src))))
        .length,
    0,
  );
  maxJs = Math.max(maxJs, jsBytes);
  if (jsBytes > 200 * 1024)
    failures.push(`Initial JS budget ${route}: ${jsBytes}`);
  if (/C:\\\\Users\\\\|D:\\\\Projects\\\\|BEGIN PRIVATE KEY/.test(html))
    failures.push(`Private artifact pattern ${route}`);
}
for (const e of examples) {
  const dir = `out/examples-data/1.0.0/${e.id}`;
  for (const [file, expected] of Object.entries({
    'input.json': e.input,
    'manifest.json': e.manifest,
  })) {
    if (
      JSON.stringify(JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8'))) !==
      JSON.stringify(expected)
    )
      failures.push(`${e.id} ${file} parity`);
  }
  if (
    fs.readFileSync(`${dir}/output.csv`, 'utf8') !== toCsv(e.columns, e.output)
  )
    failures.push('CSV parity');
  if (
    JSON.stringify(
      JSON.parse(fs.readFileSync(`${dir}/output.json`, 'utf8')),
    ) !== JSON.stringify(e.output)
  )
    failures.push('JSON parity');
}
const searchBytes = gzipSync(fs.readFileSync('out/search-index.json')).length;
if (searchBytes > 150 * 1024) failures.push('Search index budget');
fs.writeFileSync('artifacts/headers.json', JSON.stringify(manifest, null, 2));
const hostHeaders = Object.entries(manifest).map(([route, item]) => ({
  source: route === '/404/' ? '/404.html' : route,
  headers: Object.entries(item.headers).map(([key, value]) => ({ key, value })),
}));
fs.writeFileSync(
  'artifacts/vercel.static.json',
  JSON.stringify(
    { framework: null, outputDirectory: 'out', headers: hostHeaders },
    null,
    2,
  ),
);
fs.writeFileSync(
  'out/robots.txt',
  production
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`
    : 'User-agent: *\nDisallow: /\n',
);
fs.writeFileSync(
  'out/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
    production
      ? routes()
          .filter((r) => r !== '/search/')
          .map((r) => `<url><loc>${new URL(r, origin).href}</loc></url>`)
          .join('')
      : ''
  }</urlset>`,
);
const report = {
  routes: routes().length,
  maxInitialJsGzipBytes: maxJs,
  searchIndexGzipBytes: searchBytes,
  mode: production ? 'production' : 'local-preview',
  failures,
};
fs.writeFileSync(
  'artifacts/export-report.json',
  JSON.stringify(report, null, 2),
);
console.log(report);
if (failures.length) throw new Error('Export checks failed');
const files: { file: string; bytes: number; sha256: string }[] = [];
function inventory(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) inventory(file);
    else {
      const bytes = fs.readFileSync(file);
      files.push({
        file: path.relative('out', file).replaceAll('\\', '/'),
        bytes: bytes.length,
        sha256: createHash('sha256').update(bytes).digest('hex'),
      });
    }
  }
}
inventory('out');
fs.writeFileSync(
  'artifacts/build-manifest.json',
  JSON.stringify({ mode: report.mode, files }, null, 2),
);
