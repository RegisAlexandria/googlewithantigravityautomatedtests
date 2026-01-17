import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly firstResult: Locator;
    readonly resultStats: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstResult = page.locator('#search .g').first();
        this.resultStats = page.locator('#result-stats');
    }

    async getTitle() {
        return this.page.title();
    }

    async hasResults() {
        return await this.firstResult.isVisible();
    }
}
