import { defineConfig } from '@playwright/test';
const full = [
  [360, 800],
  [390, 844],
  [844, 390],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1180, 820],
  [1366, 768],
  [1920, 1080],
  [2560, 1440],
];
const edge = [
  [320, 800],
  ...[767, 768, 1023, 1024, 1199, 1200, 1599, 1600].map((w) => [w, 900]),
];
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 120000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'artifacts/playwright-results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    ...full.map(([width, height]) => ({
      name: `chromium-${width}x${height}`,
      use: {
        browserName: 'chromium' as const,
        viewport: { width, height },
        hasTouch: width < 1200,
      },
      metadata: { coverage: 'full' },
    })),
    ...edge.map(([width, height]) => ({
      name: `edge-${width}x${height}`,
      use: { browserName: 'chromium' as const, viewport: { width, height } },
      metadata: { coverage: 'edge' },
    })),
    ...[
      [390, 844],
      [820, 1180],
      [1180, 820],
    ].map(([width, height]) => ({
      name: `webkit-${width}x${height}`,
      use: {
        browserName: 'webkit' as const,
        viewport: { width, height },
        hasTouch: true,
      },
      metadata: { coverage: 'smoke' },
    })),
    ...[
      [1366, 768],
      [1920, 1080],
    ].map(([width, height]) => ({
      name: `firefox-${width}x${height}`,
      use: { browserName: 'firefox' as const, viewport: { width, height } },
      metadata: { coverage: 'smoke' },
    })),
  ],
});
