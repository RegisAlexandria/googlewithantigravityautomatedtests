import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Search - Im Feeling Lucky', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    await homePage.searchInput.fill('wikipedia');
    await homePage.clickImFeelingLucky();

    // Should navigate to Wikipedia directly
    // URL might be wikipedia OR google with a redirect notice, or a different result.
    // We check if we left the homepage (path should not be just /)
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).not.toMatch(/google\.com\/?(\?.*)?$/); // Should not be just google.com home
});
