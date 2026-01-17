import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Search - Long Query Boundary', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    const longQuery = 'a'.repeat(5000);
    await homePage.search(longQuery);

    // Expectation: Browser doesn't crash, maybe results, maybe error message, but page should be usable
    // Just checking we navigated somewhere or stayed alive
    const title = await page.title();
    expect(title).toBeDefined();
});
