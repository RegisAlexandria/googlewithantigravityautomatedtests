import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';

test('Search - Happy Path', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    const resultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await homePage.search('playwright test');

    expect(await resultsPage.getTitle()).toContain('playwright test');
    expect(await resultsPage.hasResults()).toBeTruthy();
});
