import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";

export class DeleteModalPage extends BasePage {
    protected pageName = "Модальное окно удаления объявления";

    readonly deleteModalForm: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deleteModalForm = page.locator("[data-marker=\"delete-modal-form\"]");
        this.deleteButton = page.locator("[data-marker=\"delete-modal-confirm\"]");
    }

    protected root(): Locator {
        return this.deleteModalForm;
    }

    async clickConfirmDeleteButton() {
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
    }
}
