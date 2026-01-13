import { Page } from "@playwright/test";
import { AuthResponse } from "./types";

const UI_BASE = "https://testboard.avito.com";

export async function applyAuthToLocalStorage(
    page: Page,
    auth: AuthResponse
) {
    const authStorage = {
        state: {
            user: auth.user,
            token: auth.token,
        },
        version: 0,
    };

    const tokenStorageValue = JSON.stringify(auth.token);
    const userStorageValue = JSON.stringify(auth.user);
    const authStorageValue = JSON.stringify(authStorage);

    await page.addInitScript(
        ({ authStorageValue, tokenStorageValue, userStorageValue }) => {
            localStorage.setItem("auth-storage", authStorageValue);
            localStorage.setItem("auth-token", tokenStorageValue);
            localStorage.setItem("auth-user", userStorageValue);
        },
        { authStorageValue, tokenStorageValue, userStorageValue }
    );

    await page.goto(UI_BASE, { waitUntil: "domcontentloaded" });
}
