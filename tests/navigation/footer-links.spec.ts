import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Navigation - Footer Links', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    await homePage.clickFooterLink('Sobre');
    await expect(page).toHaveURL(/about\.google/);
});
