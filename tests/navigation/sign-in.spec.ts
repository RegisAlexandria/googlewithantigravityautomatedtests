import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Navigation - Sign In', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    await homePage.signInButton.click();
    await expect(page).toHaveURL(/accounts\.google\.com/);
});
