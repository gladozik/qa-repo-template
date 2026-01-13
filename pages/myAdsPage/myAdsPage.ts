import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";
import { MY_ADS_URL } from "../../helpers/consts";

export class MyAdsPage extends BasePage {
    readonly emptyStateTitle: Locator;
    readonly myAdsTitle: Locator;
    readonly adDeleteButton: Locator;
    readonly adMenuButton: string;
    readonly myAdCardTitle: string;
    readonly myAdCard: string;

    constructor(page: Page) {
        super(page);

        this.myAdsTitle = page.locator('[data-marker="my-ads-title"]');
        this.emptyStateTitle = page.locator('[data-marker="empty-state-title"]');
        this.adDeleteButton = page.locator('[data-marker="ad-delete-button"]');
        this.adMenuButton = '[data-marker="ad-menu-button"]';
        this.myAdCardTitle = '[data-marker="my-ad-card-title"]';
        this.myAdCard = '[data-marker="my-ad-card"]';
    }

    protected root(): Locator {
        return this.myAdsTitle;
    }

    async openMyAdsPage() {
        await this.page.goto(MY_ADS_URL);
        await this.waitForOpen();
    }

    async openAdMenuByTitle(title: string) {
        const card = this.getCardByTitle(title);
        await expect(card).toBeVisible();

        const menuButton = card.locator(this.adMenuButton);
        await expect(menuButton).toBeVisible();
        await menuButton.click();
    }

    async clickDeleteInAdMenu() {
        await expect(this.adDeleteButton).toBeVisible();
        await this.adDeleteButton.click();
    }

    getCardByTitle(title: string): Locator {
        const titleLocator = this.page.locator(this.myAdCardTitle, { hasText: title });
        const card = this.page.locator(this.myAdCard, { has: titleLocator }).first();

        return card;
    }

    async assertEmptyStateTitleIsVisible() {
        await expect(
            this.emptyStateTitle,
            'Заголовок заглушки отсутствия объявлений не отображается'
        ).toBeVisible();
    }

    async assertItemWithTitleVisible(title: string) {
        const titleLocator = this.page.locator(this.myAdCardTitle, { hasText: title });

        await expect(titleLocator).toBeVisible();
    }
}
