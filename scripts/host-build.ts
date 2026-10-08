import { spawnSync } from 'node:child_process';
import { PRODUCTION_ORIGIN } from '../lib/site';
const npm = process.env.npm_execpath;
if (!npm) throw Error('Run via npm run build:host');
const production = process.env.VERCEL_ENV === 'production';
for (const script of ['build', 'prepare:host']) {
  const result = spawnSync(process.execPath, [npm, 'run', script], {
    stdio: 'inherit',
    env: {
      ...process.env,
      SITE_MODE: production ? 'production' : 'preview',
      SITE_ORIGIN: production ? PRODUCTION_ORIGIN : '',
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
