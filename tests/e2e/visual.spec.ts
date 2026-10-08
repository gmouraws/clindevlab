import { test, expect } from '@playwright/test';
test('capture original ClinDevLab review screens', async ({ page }, info) => {
  test.skip(
    info.project.metadata.coverage === 'edge',
    'Breakpoint reflow is asserted by the responsive suite.',
  );
  for (const [name, path] of [
    ['home', '/'],
    ['domain', '/explore/sdtm/2-0/ig/3-4/domains/vs/'],
    ['variable', '/explore/sdtm/2-0/ig/3-4/domains/vs/variables/vsdtc/'],
    ['search', '/search/#q=USUBJID&kind=variable&domain=dm'],
    ['example', '/examples/vital-signs-rows/'],
  ]) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    if (name === 'search')
      await expect(page.locator('.search-results li')).toHaveCount(1);
    const screenshot = await page.screenshot({
      path: `artifacts/screenshots/${info.project.name}/${name}.png`,
      fullPage: true,
    });
    await info.attach(name, { body: screenshot, contentType: 'image/png' });
  }
});
