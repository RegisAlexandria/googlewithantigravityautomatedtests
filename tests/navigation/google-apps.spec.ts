import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Navigation - Google Apps Menu', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    // Use the selector from the page object directly or ensure it matches
    // Note: googleAppsButton in POM is now: a[href*="about.google/products"]
    await homePage.googleAppsButton.click();

    // The menu might be an iframe or a div.
    const appsMenu = page.locator('div[aria-label="Google apps"], div[aria-label="Apps do Google"], iframe[role="presentation"]');

    // Wait for either
    await expect(async () => {
        const frameCount = page.frames().length;
        const visible = await appsMenu.first().isVisible().catch(() => false);
        expect(frameCount > 1 || visible).toBeTruthy();
    }).toPass();
});
