import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { PRODUCTION_ORIGIN } from '../lib/site';
const npm = process.env.npm_execpath;
if (!npm) throw Error('Run through npm run check:production');
const run = (script: string, production: boolean) => {
  const env = {
    ...process.env,
    SITE_MODE: production ? 'production' : 'preview',
    SITE_ORIGIN: production ? PRODUCTION_ORIGIN : '',
    NEXT_TELEMETRY_DISABLED: '1',
  };
  const result = spawnSync(process.execPath, [npm, 'run', script], {
    stdio: 'inherit',
    env,
  });
  if (result.status !== 0) throw Error(`${script} failed`);
};
try {
  // Builds with the approved canonical origin locally; does not deploy or contact that origin.
  run('build', true);
  fs.copyFileSync(
    'artifacts/export-report.json',
    'artifacts/production-simulation.json',
  );
  run('check:performance', true);
} finally {
  run('build', false);
}
