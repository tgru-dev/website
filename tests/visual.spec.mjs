import { test, expect } from '@playwright/test';

const widths = [1440, 1024, 768, 390, 320];

test('no horizontal overflow at any target width', async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeVisible();
});

test('hero and project content are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Frontend & AI.');
  await expect(page.locator('.project')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /github\.com\/tgru-dev/i }).first()).toBeVisible();
});

test('reduced motion disables the entrance animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const animation = await page.locator('.hero-copy').evaluate(
    (element) => getComputedStyle(element).animationName,
  );
  expect(animation).toBe('none');
});

test('capture desktop and mobile screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true, animations: 'disabled' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true, animations: 'disabled' });
});
