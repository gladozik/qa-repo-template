import { Locator, Page, expect } from "@playwright/test";
import {BasePage} from "../basePage";
import {AUTH_REGISTER_URL} from "../../helpers/consts";

export class RegisterPage extends BasePage {
    protected pageName = "Страница регистрации";

    readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator("header");
    }

    protected root(): Locator {
        return this.header;
    }

    async assertRegisterPageURL() {
        await expect(this.page).toHaveURL(AUTH_REGISTER_URL);
    }
}
