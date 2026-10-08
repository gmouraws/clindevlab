import fs from 'node:fs';
import { examples, toCsv } from '../lib/data';
import { searchIndex } from '../lib/index';
import { validateContent } from '../lib/validate';
await validateContent();
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/search-index.json', JSON.stringify(searchIndex()));
for (const e of examples) {
  const dir = `public/examples-data/1.0.0/${e.id}`;
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, data] of Object.entries({
    'input.json': JSON.stringify(e.input, null, 2),
    'output.json': JSON.stringify(e.output, null, 2),
    'output.csv': toCsv(e.columns, e.output),
    'manifest.json': JSON.stringify(e.manifest, null, 2),
  }))
    fs.writeFileSync(`${dir}/${name}`, data);
}
console.log('Generated search index and 12 synthetic downloads.');
