import { test, expect } from '@playwright/test';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Test that we can buy the product', async ({ page }) => {
    await page.getByRole('link', { name: 'Test simple' }).first().click();

    // Expects the URL to contain test-simple
    await page.waitForURL('http://localhost:3000/product/test-simple?id=29', {
      waitUntil: 'networkidle',
    });

    await expect(page).toHaveURL(/.*simple/);

    await expect(page.getByRole('button', { name: 'Purchase' })).toBeVisible();

    await page.getByRole('button', { name: 'Purchase' }).click();

    await page.locator('#header').getByText('1').waitFor();

    await expect(page.locator('#header').getByText('1')).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole('link', { name: 'Cart' }).click();

    await page.locator('section').filter({ hasText: 'Cart' }).waitFor();

    // Check that that Cart is visible
    await expect(
      page.locator('section').filter({ hasText: 'Cart' })
    ).toBeVisible();

    // Check that we can go to Checkout

    await page.getByRole('button', { name: 'GO TO CHECKOUT' }).click();

    await page.waitForURL('http://localhost:3000/checkout', {
      waitUntil: 'networkidle',
    });

    await expect(
      page.locator('section').filter({ hasText: 'Checkout' })
    ).toBeVisible();

    // Check that we can type something in Billing fields

    await page.getByPlaceholder('Last Name').fill('testetternavn');

    await page.getByPlaceholder('Last Name').waitFor();

    await expect(page.getByPlaceholder('Last Name')).toHaveValue(
      'testetternavn'
    );
  });
});
