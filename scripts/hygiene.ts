import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const files = [
  ...new Set(
    execFileSync(
      'git',
      ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
      { encoding: 'utf8' },
    )
      .split('\0')
      .filter(Boolean),
  ),
];
const rules: [string, RegExp][] = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  [
    'github-token',
    /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})/,
  ],
  ['cloud-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['credential-url', /https?:\/\/[^\s/@:]+:[^\s/@]+@/],
  [
    'private-machine-path',
    /(?:[A-Z]:[\\/](?:Users|Projects)[\\/]|\/(?:Users|home)\/[a-z][^\s/]*)/,
  ],
  ['excluded-organization', new RegExp(['Cura', 'del'].join(''), 'i')],
];
const findings: { file: string; rule: string }[] = [];
for (const file of files) {
  if (
    /^(?:node_modules|out|artifacts|test-results|playwright-report|\.next|\.vercel)\//.test(
      file,
    ) ||
    /(?:^|\/)\.env(?:$|\.)/.test(file)
  )
    findings.push({ file, rule: 'private-or-generated-file' });
  const text = fs.readFileSync(file, 'utf8');
  for (const [rule, expression] of rules)
    if (expression.test(text)) findings.push({ file, rule });
}
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync(
  'artifacts/publication-hygiene.json',
  JSON.stringify(
    {
      files: files.length,
      findings,
      scope:
        'Candidate Git source files; pattern scan, not a guarantee that every possible secret is detectable.',
    },
    null,
    2,
  ),
);
console.log({ files: files.length, findings });
if (findings.length) throw Error('Publication hygiene review required');
