import { test, expect } from '@playwright/test';
import { GoogleHomePage } from '../../pages/GoogleHomePage';

test('Settings - Open Search Settings', async ({ page }) => {
    const homePage = new GoogleHomePage(page);
    await homePage.goto();

    await homePage.settingsButton.click();
    await expect(page.locator('text=Configurações de pesquisa')).toBeVisible(); // Or similar menu item
});
