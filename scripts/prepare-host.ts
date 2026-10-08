import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Local artifact preparation only. Never invokes a provider CLI or network API.
const manifest = JSON.parse(
  fs.readFileSync('artifacts/headers.json', 'utf8'),
) as Record<string, { sha256: string; headers: Record<string, string> }>;
for (const [route, record] of Object.entries(manifest)) {
  const file =
    route === '/404/' ? 'out/404.html' : path.join('out', route, 'index.html');
  if (
    createHash('sha256').update(fs.readFileSync(file)).digest('hex') !==
    record.sha256
  )
    throw Error(`Headers do not match HTML: ${route}`);
}
const destination = path.resolve('.vercel/output');
if (destination !== path.join(process.cwd(), '.vercel', 'output'))
  throw Error('Invalid output location');
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
fs.cpSync('out', path.join(destination, 'static'), { recursive: true });
const escapePattern = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rules: Record<string, unknown>[] = [];
for (const [route, record] of Object.entries(manifest)) {
  if (route === '/404/') continue;
  const file = `${route}index.html`;
  rules.push({
    src: `^${escapePattern(file)}$`,
    headers: { Location: route },
    status: 308,
  });
  if (route !== '/')
    rules.push({
      src: `^${escapePattern(route.slice(0, -1))}$`,
      headers: { Location: route },
      status: 308,
    });
  rules.push({
    src: `^${escapePattern(route)}$`,
    dest: file,
    headers: record.headers,
  });
}
rules.push({
  src: '^/404.html$',
  dest: '/404.html',
  headers: manifest['/404/'].headers,
  status: 404,
});
rules.push({
  src: '/(.*)',
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'X-Frame-Options': 'DENY',
  },
  continue: true,
});
rules.push({ handle: 'filesystem' });
rules.push({
  src: '/(.*)',
  dest: '/404.html',
  headers: manifest['/404/'].headers,
  status: 404,
});
fs.writeFileSync(
  path.join(destination, 'config.json'),
  JSON.stringify({ version: 3, routes: rules }, null, 2),
);
console.log(
  `Prepared local Build Output API artifact for ${Object.keys(manifest).length} pages; not deployed.`,
);
