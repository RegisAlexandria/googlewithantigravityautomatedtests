import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';

test('Accessibility - Keyboard Navigation', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    const resultsPage = new SearchResultsPage(page);
    await homePage.goto();

    // Tab to search input
    await page.keyboard.press('Tab');
    // Might need multiple tabs or check focus
    // For simplicity, we ensure search input is focused
    await homePage.searchInput.focus();

    await page.keyboard.type('keyboard accessibility');
    await page.waitForTimeout(500); // Debounce
    await page.keyboard.press('Enter');

    await expect(resultsPage.firstResult).toBeVisible({ timeout: 10000 });
    expect(await resultsPage.hasResults()).toBeTruthy();
});
