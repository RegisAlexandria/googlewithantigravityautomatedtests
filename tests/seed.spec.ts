// example.spec.js
import { test, expect } from '@playwright/test';

test('navigate to Google homepage', async ({ page }) => {
  // Go to Google
  await page.goto('https://www.google.com');

  // Check that the title contains "Google"
  await expect(page).toHaveTitle(/Google/);
});