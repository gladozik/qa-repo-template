import { Page } from "@playwright/test";
import { AuthResponse } from "./types";

const UI_BASE = "https://testboard.avito.com";

export async function applyAuthToLocalStorage(
    page: Page,
    auth: AuthResponse
) {
    const authStorageValue = JSON.stringify({
        state: {
            user: auth.user,
            token: auth.token,
        },
        version: 0,
    });

    // Кладём стор ДО первой загрузки приложения
    await page.addInitScript(({ authStorageValue }) => {
        localStorage.setItem("auth-storage", authStorageValue);
    }, { authStorageValue });

    // Заходим в приложение уже с готовым стором
    await page.goto(UI_BASE, { waitUntil: "domcontentloaded" });
}
