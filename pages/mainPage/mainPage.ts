import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class MainPage extends BasePage {
    readonly header: Locator;
    readonly mobileMenuButton: Locator;
    readonly loginButtonDesktop: Locator;
    readonly loginButtonMobile: Locator;
    readonly myAdsBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
        this.mobileMenuButton = page.locator('[data-marker="mobile-menu-button"]');
        this.loginButtonDesktop = page.locator('[data-marker="login-button-desktop"]');
        this.loginButtonMobile = page.locator('[data-marker="login-button-mobile"]');
        this.myAdsBtn = page.locator('[data-marker="my-ads-link"]');
    }

    protected root(): Locator {
        return this.header;
    }

    async openMainPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async openMyAdsPage() {
        await this.myAdsBtn.click()
    }

    async openLoginDesktop() {
        await this.loginButtonDesktop.click();
    }
    async openLoginMobile() {
        await this.loginButtonMobile.click();
    }

}
