import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Search - Empty Query', async ({ page }) => {
    const homePage = new GoogleHomePage(page);

    await homePage.goto();
    // Ensure empty
    await homePage.searchInput.fill('');
    await homePage.searchInput.press('Enter');

    // Should still be on homepage or at least not have search results for empty string
    // Checking if title still contains Google and not some error
    await expect(page).toHaveTitle(/Google/);
});
