import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('out');
const headers: Record<string, { headers: Record<string, string> }> = JSON.parse(
  fs.readFileSync('artifacts/headers.json', 'utf8'),
);
const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
};
http
  .createServer((req, res) => {
    let pathname: string;
    try {
      pathname = decodeURIComponent(
        new URL(req.url || '/', 'http://127.0.0.1').pathname,
      );
    } catch {
      res.writeHead(400);
      res.end('Invalid URL');
      return;
    }
    let file = path.resolve(
      root,
      `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`,
    );
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      res.writeHead(308, { Location: `${pathname}/` });
      res.end();
      return;
    }
    const exists = fs.existsSync(file) && fs.statSync(file).isFile();
    if (!exists) file = path.join(root, '404.html');
    const headerPath = pathname.endsWith('/index.html')
      ? pathname.slice(0, -10)
      : pathname;
    const h = headers[
      exists ? (headerPath === '/404.html' ? '/404/' : headerPath) : '/404/'
    ]?.headers || {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': pathname.startsWith('/_next/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate',
    };
    let data = fs.readFileSync(file);
    const extra: Record<string, string> = {
      'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
    };
    if (req.headers['accept-encoding']?.includes('gzip')) {
      data = gzipSync(data);
      extra['Content-Encoding'] = 'gzip';
      extra.Vary = 'Accept-Encoding';
    }
    res.writeHead(exists ? 200 : 404, { ...h, ...extra });
    res.end(req.method === 'HEAD' ? undefined : data);
  })
  .listen(4173, '127.0.0.1', () =>
    console.log('ClinDevLab static preview: http://127.0.0.1:4173'),
  );
