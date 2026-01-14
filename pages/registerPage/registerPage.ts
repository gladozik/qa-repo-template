import { Locator, Page } from "@playwright/test";
import {BasePage} from "../basePage";

export class RegisterPage extends BasePage {
    readonly form: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly birthdateInput: Locator;
    readonly passwordToggle: Locator;
    readonly confirmPasswordToggle: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);

        this.form = page.locator("[data-marker=\"register-form\"]");
        this.firstNameInput = page.locator("[data-marker=\"first-name-input\"]");
        this.lastNameInput = page.locator("[data-marker=\"last-name-input\"]");
        this.emailInput = page.locator("[data-marker=\"email-input\"]");
        this.passwordInput = page.locator("[data-marker=\"password-input\"]");
        this.confirmPasswordInput = page.locator("[data-marker=\"confirm-password-input\"]");
        this.birthdateInput = page.locator("[data-marker=\"birthdate-input\"]");
        this.passwordToggle = page.locator("[data-marker=\"password-toggle\"]");
        this.confirmPasswordToggle = page.locator("[data-marker=\"confirm-password-toggle\"]");
        this.submitButton = page.locator("[data-marker=\"submit-button\"]");
    }

    protected root(): Locator {
        return this.form;
    }

    async openRegisterPage() {
        await this.page.goto("/auth/register");
        await this.waitForOpen();
    }

    async fillFirstName(value: string) {
        await this.firstNameInput.fill(value);
    }

    async fillLastName(value: string) {
        await this.lastNameInput.fill(value);
    }

    async fillEmail(value: string) {
        await this.emailInput.fill(value);
    }

    async fillPassword(value: string) {
        await this.passwordInput.fill(value);
    }

    async fillConfirmPassword(value: string) {
        await this.confirmPasswordInput.fill(value);
    }

    async fillBirthdate(value: string) {
        //YYYY-MM-DD
        await this.birthdateInput.fill(value);
    }

    async togglePasswordVisibility() {
        await this.passwordToggle.click();
    }

    async toggleConfirmPasswordVisibility() {
        await this.confirmPasswordToggle.click();
    }

    async submit() {
        await this.submitButton.click();
    }

    async register(data: {
        firstName: string;
        lastName?: string;
        email: string;
        password: string;
        confirmPassword?: string;
        birthdate?: string; // YYYY-MM-DD
    }) {
        await this.fillFirstName(data.firstName);

        if (data.lastName) await this.fillLastName(data.lastName);
        await this.fillEmail(data.email);

        await this.fillPassword(data.password);
        await this.fillConfirmPassword(data.confirmPassword ?? data.password);

        if (data.birthdate) await this.fillBirthdate(data.birthdate);

        await this.submit();
    }

    async waitForOpen() {

    }
}
