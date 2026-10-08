import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
function generate() {
  const lockText = fs.readFileSync('package-lock.json', 'utf8');
  const lock = JSON.parse(lockText);
  const inventory = [];
  const notices = [
    'ClinDevLab third-party notices\nIncludes installed build/test tools as well as browser dependencies. Inclusion here does not mean a package is shipped in the static site. Original ClinDevLab code/content has no outbound license selected.',
  ];
  const noticeFiles: { path: string; sha256: string }[] = [];
  function retain(file: string, heading: string) {
    const text = fs.readFileSync(file, 'utf8');
    notices.push(`\n--- ${heading} ---\n${text}`);
    noticeFiles.push({ path: file.replaceAll('\\', '/'), sha256: hash(text) });
  }
  for (const [location, item] of Object.entries(lock.packages).sort(
    ([a], [b]) => a.localeCompare(b, 'en'),
  ) as [
    string,
    { version?: string; license?: string; dev?: boolean; optional?: boolean },
  ][]) {
    if (!location) continue;
    const file = path.join(location, 'package.json');
    const pkg = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : null;
    const name = pkg?.name || location.split('node_modules/').at(-1);
    const version = pkg?.version || item.version;
    if (pkg && version !== item.version)
      throw Error(`Installed version differs from lockfile: ${location}`);
    const license = pkg?.license || item.license;
    if (!license || license === 'UNKNOWN')
      throw Error(`Unresolved dependency license: ${location}`);
    if (!pkg && !item.optional)
      throw Error(`Missing required dependency: ${location}`);
    const category = ['next', 'react', 'react-dom', 'scheduler'].includes(name)
      ? 'browser-runtime'
      : item.dev
        ? 'development'
        : 'build-or-transitive';
    inventory.push({
      name,
      version,
      license,
      development: !!item.dev,
      optional: !!item.optional,
      installed: !!pkg,
      location,
      category,
    });
    if (!pkg) continue;
    const files = fs
      .readdirSync(location)
      .sort()
      .filter((n) => /^(licen[sc]e|copying|notice)(\.|$)/i.test(n));
    for (const name of files) {
      const file = path.join(location, name);
      if (fs.statSync(file).isFile())
        retain(file, `${pkg.name}@${version}: ${name}`);
    }
    if (category === 'browser-runtime' && !files.length)
      throw Error(`Missing runtime license text: ${name}`);
  }
  function compiledNotices(dir: string) {
    for (const entry of fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) compiledNotices(file);
      else if (/^(licen[sc]e|copying|notice)(\.|$)/i.test(entry.name))
        retain(
          file,
          `Next bundled component ${path.relative('node_modules/next', file).replaceAll('\\', '/')}`,
        );
    }
  }
  compiledNotices('node_modules/next/dist/compiled');
  const noticeText = notices.join('\n');
  const manifest = {
    lockfileSha256: hash(lockText),
    noticesSha256: hash(noticeText),
    packages: inventory,
    noticeFiles,
  };
  return {
    inventory: JSON.stringify(inventory, null, 2),
    manifest: JSON.stringify(manifest, null, 2),
    notices: noticeText,
  };
}
const first = generate();
const second = generate();
if (JSON.stringify(first) !== JSON.stringify(second))
  throw Error('License generation is not reproducible');
fs.mkdirSync('artifacts', { recursive: true });
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('artifacts/dependency-licenses.json', first.inventory);
fs.writeFileSync('public/license-inventory.json', first.manifest);
fs.writeFileSync('public/third-party-notices.txt', first.notices);
fs.writeFileSync(
  'artifacts/license-reproducibility.json',
  JSON.stringify(
    {
      identical: true,
      scope:
        'Two independent reads of the same lockfile and installed dependency tree; optional packages vary by platform.',
      inventorySha256: hash(first.manifest),
      noticesSha256: hash(first.notices),
    },
    null,
    2,
  ),
);
console.log(
  `License inventory verified and reproduced: ${JSON.parse(first.inventory).length} packages; all collected license texts retained.`,
);
