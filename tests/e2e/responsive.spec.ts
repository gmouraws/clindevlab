import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  examples,
  variables,
  BASE,
  domainUrl,
  variableUrl,
  toCsv,
} from '../../lib/data';
const vs = domainUrl('VS'),
  variable = variableUrl('VS', 'VSDTC');
const fullPages = [
  '/',
  '/learn/clinical-trials-for-developers/',
  BASE,
  vs,
  variable,
  '/explore/terminology/',
  '/search/',
  '/about/',
  '/legal/',
  '/legal/third-party-licenses/',
  ...examples.map((e) => `/examples/${e.id}/`),
];
const smokePages = [vs, variable, '/search/', '/examples/vital-signs-rows/'];
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
}
test('domain filters, keyboard entry and long source context remain usable', async ({
  page,
  browserName,
}) => {
  await page.goto('/');
  const mainNav = page.getByRole('navigation', { name: 'Main navigation' });
  if ((page.viewportSize()?.width || 0) >= 1024) {
    await expect(
      mainNav.getByRole('link', { name: 'Learn', exact: true }),
    ).toBeVisible();
    await expect(page.locator('.navigation summary')).toBeHidden();
  }
  if (browserName === 'webkit')
    await page.getByRole('link', { name: 'Skip to content' }).focus();
  else await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('link', { name: 'Start learning' }).click();
  await expect(page).toHaveURL(/\/learn\/$/);
  await page.goBack();
  await page.getByRole('link', { name: 'Explore six domains' }).click();
  await page
    .getByLabel('Observation class', { exact: true })
    .selectOption('findings');
  await expect(page.locator('.domain-card')).toHaveCount(2);
  await page.getByLabel('Find a domain').fill('LB');
  await expect(page.locator('.domain-card')).toHaveCount(1);
  await expect(page.locator('.domain-card')).toContainText('LB');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.domain-card')).toHaveCount(6);
  await page.goBack();
  await expect(page.locator('.domain-card')).toHaveCount(1);
  await page.goForward();
  await expect(page.locator('.domain-card')).toHaveCount(6);
  await page.goto(variable);
  await page
    .locator('.sources a')
    .first()
    .evaluate((el) => {
      el.textContent =
        'https://publisher.example/' + 'long-source-context-'.repeat(20);
    });
  await noOverflow(page);
  const menu = page.locator('.navigation summary');
  if (await menu.isVisible()) {
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible();
    const original = page.viewportSize();
    await page.setViewportSize({ width: 844, height: 390 });
    await noOverflow(page);
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    if (original) await page.setViewportSize(original);
  }
});

test('content, headers, navigation and layout at the required viewport', async ({
  page,
  browserName,
}, info) => {
  const errors: string[] = [];
  const policyEvents: {
    tag: string;
    style: string | null;
    directive: string;
  }[] = [];
  await page.exposeFunction(
    'recordPolicyViolation',
    (event: (typeof policyEvents)[number]) => policyEvents.push(event),
  );
  await page.addInitScript(() =>
    document.addEventListener('securitypolicyviolation', (e) => {
      const target = e.target as HTMLElement;
      (
        window as unknown as {
          recordPolicyViolation: (event: {
            tag: string;
            style: string | null;
            directive: string;
          }) => void;
        }
      ).recordPolicyViolation({
        tag: target?.tagName || '',
        style: target?.getAttribute?.('style') ?? null,
        directive: e.effectiveDirective,
      });
    }),
  );
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    // WebKit 27.2 on Windows reports this for native select elements even in a minimal static HTML fixture.
    // Keep the strict CSP; account for this known engine warning separately rather than allowing inline styles.
    if (m.type() === 'error') errors.push(m.text());
  });
  for (const route of info.project.metadata.coverage === 'smoke'
    ? smokePages
    : fullPages) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-security-policy']).toContain(
      "script-src 'self'",
    );
    expect(response?.headers()['x-frame-options']).toBe('DENY');
    await expect(page.locator('main h1')).toBeVisible();
    expect(
      await page
        .locator('.eyebrow,.version-strip,.metadata dt,.specimen-fields dt')
        .evaluateAll((elements) =>
          elements.every(
            (el) => parseFloat(getComputedStyle(el).fontSize) >= 14,
          ),
        ),
    ).toBe(true);
    await noOverflow(page);
  }
  const menu = page.locator('.navigation summary');
  if (await menu.isVisible()) {
    await menu.click();
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Learn', exact: true }),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(page.locator('.navigation')).not.toHaveAttribute('open', '');
  } else
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Learn', exact: true }),
    ).toBeVisible();
  const nativeSelectWarning =
    "Refused to apply a stylesheet because its hash, its nonce, or 'unsafe-inline' does not appear in the style-src directive of the Content Security Policy.";
  const nativeWarnings =
    browserName === 'webkit'
      ? errors.filter((e) => e === nativeSelectWarning)
      : [];
  expect(nativeWarnings.length).toBeLessThanOrEqual(2);
  expect(policyEvents.length).toBe(nativeWarnings.length);
  for (const event of policyEvents)
    expect(event).toEqual({
      tag: 'SELECT',
      style: null,
      directive: 'style-src-attr',
    });
  if (nativeWarnings.length)
    await info.attach('known-webkit-native-select-warning', {
      body: JSON.stringify(nativeWarnings),
      contentType: 'application/json',
    });
  expect(
    errors.filter(
      (e) => !(browserName === 'webkit' && e === nativeSelectWarning),
    ),
  ).toEqual([]);
});
test('all table fields survive record reading and local scrolling', async ({
  page,
}, info) => {
  await page.goto(vs);
  const data = page.getByRole('region', {
    name: 'VS selected variable lessons',
    exact: true,
  });
  const table = data.locator('table');
  await expect(table.locator('tbody tr')).toHaveCount(8);
  await expect(table.locator('thead th')).toHaveCount(5);
  const values = await table.locator('tbody tr').allTextContents();
  const scroller = data.locator('.table-scroll');
  await scroller.focus();
  if (await scroller.evaluate((e) => e.scrollWidth > e.clientWidth + 1)) {
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(() => scroller.evaluate((e) => e.scrollLeft))
      .toBeGreaterThan(0);
  }
  await page.keyboard.press('End');
  await scroller.evaluate((e) => {
    e.scrollLeft = e.scrollWidth;
  });
  expect(
    await scroller.evaluate(
      (e) => Math.abs(e.scrollWidth - e.clientWidth - e.scrollLeft) < 2,
    ),
  ).toBe(true);
  await data.getByRole('button', { name: 'Read as records' }).click();
  await expect(data.locator('table')).toBeHidden();
  await expect(data.locator('.record')).toHaveCount(8);
  for (const [i, v] of variables
    .filter((v) => v.domainCode === 'VS')
    .entries()) {
    const r = data.locator('.record').nth(i);
    await expect(r).toContainText(v.name);
    await expect(r).toContainText(v.explanation);
    await expect(r).toContainText(
      v.exampleValue === null ? 'null (missing)' : String(v.exampleValue),
    );
    await expect(r.locator('dt')).toHaveCount(5);
    expect(await r.locator('dt').allTextContents()).toEqual([
      'Identifier',
      'Domain',
      'Teaching explanation',
      'Example JSON type',
      'Example value',
    ]);
    expect(await r.locator('dd').allTextContents()).toEqual([
      v.name,
      v.domainCode,
      v.explanation,
      v.exampleJsonType,
      v.exampleValue === null ? 'null (missing)' : String(v.exampleValue),
    ]);
  }
  await noOverflow(page);
  await data.getByRole('button', { name: 'Read as table' }).click();
  expect(await table.locator('tbody tr').allTextContents()).toEqual(values);
  for (const e of info.project.metadata.coverage === 'smoke'
    ? examples.filter((e) => e.domain === 'VS')
    : examples) {
    await page.goto(`/examples/${e.id}/`);
    const view = page.locator('.data-view');
    await expect(view.locator('thead th')).toHaveCount(e.columns.length);
    for (const [i, row] of e.output.entries())
      expect(
        await view
          .locator('tbody tr')
          .nth(i)
          .locator('th,td')
          .allTextContents(),
      ).toEqual(
        e.columns.map((c) =>
          row[c] === null ? 'null (missing)' : String(row[c]),
        ),
      );
    await view.getByRole('button', { name: 'Read as records' }).click();
    for (const [i, row] of e.output.entries()) {
      const r = view.locator('.record').nth(i);
      expect(await r.locator('dt').allTextContents()).toEqual(e.columns);
      expect(await r.locator('dd').allTextContents()).toEqual(
        e.columns.map((c) =>
          row[c] === null ? 'null (missing)' : String(row[c]),
        ),
      );
    }
    await noOverflow(page);
  }
});
test('search filters, reload, history, failure and resize retain usable state', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  await page.goto('/search/');
  const input = page.getByLabel('Search the field guide');
  await input.fill('USUBJID');
  await page
    .getByLabel('Result kind', { exact: true })
    .selectOption('variable');
  await page.getByLabel('Domain', { exact: true }).selectOption('dm');
  await expect(page.locator('.search-results li')).toHaveCount(1);
  await page.reload();
  await expect(input).toHaveValue('USUBJID');
  await expect(page.getByLabel('Domain', { exact: true })).toHaveValue('dm');
  await page.locator('.search-results a').click();
  await expect(page.locator('h1')).toHaveText('USUBJID');
  await page.goBack();
  await expect(input).toHaveValue('USUBJID');
  const original = page.viewportSize();
  await page.setViewportSize({ width: 844, height: 390 });
  await noOverflow(page);
  await expect(input).toHaveValue('USUBJID');
  if (original) await page.setViewportSize(original);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(input).toHaveValue('');
  await input.fill('<script>');
  await expect(page.getByRole('status')).toContainText('0 results');
  await expect(page.locator('main script')).toHaveCount(0);
  expect(requests.some((r) => r.includes('USUBJID') || r.includes('q='))).toBe(
    false,
  );
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.route('**/search-index.json', (r) => r.abort());
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Retry search' }),
  ).toBeVisible();
  await page.unroute('**/search-index.json');
  await page.getByRole('button', { name: 'Retry search' }).click();
  await expect(page.getByRole('status')).toContainText('0 results');
});
test('code wrapping leaves source and downloads unchanged', async ({
  page,
  request,
}) => {
  const e = examples[1];
  await page.goto(`/examples/${e.id}/`);
  const view = page.getByRole('region', {
    name: 'Original synthetic input · JSON',
    exact: true,
  });
  const before = await view.locator('code').textContent();
  await view.getByRole('button', { name: 'Wrap lines' }).click();
  expect(await view.locator('code').textContent()).toBe(before);
  await noOverflow(page);
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as unknown as { copied: string }).copied = text;
        },
      },
    });
  });
  await view.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(view.getByRole('status')).toContainText('Copied exact');
  expect(
    await page.evaluate(() => (window as unknown as { copied: string }).copied),
  ).toBe(before);
  const csv = await request.get(`/examples-data/1.0.0/${e.id}/output.csv`);
  expect(await csv.text()).toBe(toCsv(e.columns, e.output));
  expect(csv.headers()['content-type']).toContain('text/csv');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw Error('denied');
        },
      },
    });
  });
  await view.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(view.getByRole('status')).toContainText('Copy unavailable');
});
test('accessibility templates and no-JS reading', async ({
  page,
  browser,
}, info) => {
  test.skip(
    info.project.name !== 'chromium-390x844',
    'One complete accessibility-template scan; responsive functionality runs across every project.',
  );
  for (const route of fullPages) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact || ''),
      ),
      JSON.stringify(result.violations),
    ).toEqual([]);
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const plain = await context.newPage();
  await plain.goto(`http://127.0.0.1:4173${vs}`);
  await expect(plain.getByRole('table')).toBeVisible();
  await expect(
    plain.getByRole('link', { name: 'VSDTC', exact: true }),
  ).toBeVisible();
  await plain.goto('http://127.0.0.1:4173/search/');
  await expect(
    plain.getByRole('link', { name: 'Browse domains' }),
  ).toBeVisible();
  await context.close();
  expect((await page.request.get('/explore/sdtm/9-0/')).status()).toBe(404);
  expect((await page.request.get(`${vs}variables/unknown/`)).status()).toBe(
    404,
  );
  await page.goto('/');
  await expect(
    page
      .getByRole('navigation', { name: 'Footer' })
      .getByRole('link', { name: 'Software notices' }),
  ).toHaveCount(0);
  await page.getByRole('link', { name: 'Privacy & legal' }).click();
  await page
    .getByRole('link', { name: 'Third-party licenses', exact: true })
    .click();
  for (const summary of await page.locator('main summary').all())
    await summary.click();
  await noOverflow(page);
  await expect(page.locator('main')).toContainText('react-dom');
  await expect(page.locator('main')).toContainText(
    'Development and test tools',
  );
  const inventory = await (
    await page.request.get('/license-inventory.json')
  ).json();
  const notices = await page.request.get('/third-party-notices.txt');
  expect(notices.ok()).toBe(true);
  expect(inventory.packages.length).toBeGreaterThan(0);
});
