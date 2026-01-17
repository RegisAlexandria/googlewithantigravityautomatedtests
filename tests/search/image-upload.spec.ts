import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Search - Image Search & Upload', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    await homePage.imageSearchButton.click();

    // Check if upload UI appears (input type file)
    const fileInput = page.locator('input[type="file"]').first();
    await expect(fileInput).toBeAttached();
});
