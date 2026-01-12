import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";
import {parsePrice} from "../../helpers/priceParseHelper";

export class SearchPage extends BasePage {
    readonly searchInput: Locator;
    readonly advertisimentCard: Locator;
    readonly emptyResultStub: Locator;
    readonly advertisementCard: Locator;
    readonly sortDropdown: Locator;
    readonly sortOptionExpensive: Locator;
    readonly adCardPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('[data-marker="search-input"]');
        this.advertisimentCard = page.locator('[data-marker="advertisement-card"]');
        this.emptyResultStub = page.locator('//img[@src="/not-found.png"]');
        this.advertisementCard = page.locator('[data-marker="advertisement-card"]');
        this.sortDropdown = page.locator('[data-marker="sort-dropdown"]');
        this.sortOptionExpensive = page.locator('[data-marker="sort-option-expensive"]');
        this.adCardPrice = page.locator('[data-marker="ad-card-price"]');
    }

    protected root(): Locator {
        return this.searchInput;
    }

    async openSearchPage() {
        await this.page.goto("/");
        await this.waitForOpen();
    }

    async fillSearchInput(searchInput: string) {
        await this.searchInput.fill(searchInput);
        await this.waitForOpen();
    }

    async openSortDropdown() {
        await this.sortDropdown.click();
    }

    async sortExpensiveFirst() {
        await this.sortOptionExpensive.click();
        await this.waitForOpen();
    }

    async getPriceForAdByIndex(index: number): Promise<number> {
        const priceText = await this.adCardPrice.nth(index).textContent();
        if (priceText === null) {
            throw new Error(`getPriceForAdByIndex: не найдена цена для карточки с индексом ${index}`);
        }
        return parsePrice(priceText);
    }


    async countAdvertisementCards(): Promise<number> {
        return await this.advertisementCard.count();
    }

    async assertEmptyResultStubIsVisible() {
        await this.waitForOpen();
        expect(
            await this.emptyResultStub.isVisible(),
            'Отсутствует заглушка пустого результата поиска'
        );
        await expect(
            this.page.locator('text=Ничего не найдено'),
            'Заголовок пустого результата поиска не отображается'
        ).toBeVisible()
        await expect(
            this.page.locator('text=Задайте запрос по-другому или установите более мягкие ограничения.'),
            'Описание пустого результата поиска не отображается'
        ).toBeVisible()
    }

    async assertSearchResultsNumber(expectedCount: number) {
        expect(expectedCount).toEqual(await this.countAdvertisementCards());
    }
}