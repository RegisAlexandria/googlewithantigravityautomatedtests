import { Page, Locator } from '@playwright/test';

export class GoogleHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator; // "Pesquisa Google"
    readonly imFeelingLuckyButton: Locator; // "Estou com sorte"
    readonly googleAppsButton: Locator;
    readonly signInButton: Locator;
    readonly settingsButton: Locator;
    readonly voiceSearchButton: Locator;
    readonly imageSearchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('textarea[name="q"], input[name="q"]');

        // Search buttons: try name="btnK" (Search) and name="btnI" (Lucky)
        // We use .first() because they appear in the dropdown too.
        this.searchButton = page.locator('input[name="btnK"]').first();
        this.imFeelingLuckyButton = page.locator('input[name="btnI"]').first();

        // Google Apps: Try aria-label (PT and EN) or common class
        this.googleAppsButton = page.locator('a[aria-label="Google apps"], a[aria-label="Google Apps"], a[aria-label="Apps do Google"]');

        this.signInButton = page.locator('a[href*="accounts.google.com"]').first();

        // Settings: generic text match or specific button
        this.settingsButton = page.locator('text=Configurações').first();

        this.voiceSearchButton = page.locator('div[aria-label="Pesquisar por voz"], div[aria-label="Search by voice"]');
        this.imageSearchButton = page.locator('div[aria-label="Pesquisa por imagem"], div[aria-label="Search by image"]');
    }

    async goto() {
        await this.page.goto('https://www.google.com/?hl=pt-BR');
    }

    async search(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
        try {
            await this.page.waitForSelector('#search', { timeout: 5000 });
        } catch {
            // ignore
        }
    }

    async searchWithButton(query: string) {
        await this.searchInput.fill(query);
        if (await this.searchButton.isVisible()) {
            await this.searchButton.click();
        } else {
            await this.searchInput.press('Enter');
        }
        await this.page.waitForSelector('#search', { timeout: 5000 }).catch(() => { });
    }

    async clickImFeelingLucky() {
        await this.imFeelingLuckyButton.click({ force: true });
    }

    async clickFooterLink(linkText: string) {
        // Use filter hasText to be less strict about exact matches
        await this.page.locator('a').filter({ hasText: linkText }).first().click();
    }
}
