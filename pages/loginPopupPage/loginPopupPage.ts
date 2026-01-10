import {Locator, Page} from "@playwright/test";
import {BasePage} from "../basePage";

export class LoginPopupPage extends BasePage {
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginSubmitButton: Locator;
    readonly registerButton: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.loginInput = page.locator('[data-marker="email-input"]');
        this.passwordInput = page.locator('[data-marker="password-input"]');
        this.loginSubmitButton = page.locator('[data-marker="login-submit-button"]');
        this.registerButton = page.locator('[data-marker="login-modal-register-link"]');
        this.emailError = page.locator('[data-marker="email-error"]')
        this.passwordError = page.locator('[data-marker="password-error"]')
    }

    protected root(): Locator {
        return this.loginInput;
    }

    async waitForOpen() {
        await this.loginInput.waitFor({ state: "visible" });
    }

    async login(email: string, password: string) {
        await this.fillLogin(email);
        await this.fillPassword(password);
        await this.clickLoginBtn();
    }

    async fillLogin(str: string) {
        await this.loginInput.fill(str);
    }

    async fillPassword(str: string) {
        await this.passwordInput.fill(str);
    }

    async clickLoginBtn() {
        await this.loginSubmitButton.click();
    }

    async clickRegisterBtn() {
        await this.registerButton.click();
    }

    async assertEmailErrorIsVisible() {
        await this.emailError.isVisible();
    }

    async assertPasswordErrorIsVisible() {
        await this.passwordError.isVisible();
    }
}
