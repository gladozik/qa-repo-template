import { test as base, expect, Page, request as pwRequest, APIRequestContext } from "@playwright/test";
import { registerUser, login } from "../helpers/authHelper";
import { applyAuthToLocalStorage } from "../helpers/authSetStorageHelper";
import {AuthResponse, RegisterDto} from "../helpers/types";

type User = RegisterDto;

function uniqueEmail() {
    return `user_${Date.now()}@example.com`;
}

type Fixtures = {
    api: APIRequestContext;
    createdUser: User;
    auth: AuthResponse;
    authedPage: Page;
};

const API_BASE = "https://testboard.avito.com";

export const test = base.extend<Fixtures>({
    api: async (_, use) => {
        const api = await pwRequest.newContext({
            baseURL: API_BASE,
            extraHTTPHeaders: {
                "Content-Type": "application/json",
            },
        });

        await use(api);
        await api.dispose();
    },

    createdUser: async ({ api }, use) => {
        const user: User = {
            first_name: "Иван",
            last_name: "Петров",
            email: uniqueEmail(),
            password: "Somepassword123",
        };

        await registerUser(api, user);
        await use(user);
    },

    auth: async ({ api, createdUser }, use) => {
        const auth = await login(api, {
            email: createdUser.email,
            password: createdUser.password,
        });

        await use(auth);
    },

    authedPage: async ({ page, auth }, use) => {
        console.log("fixture page.url() before auth =", page.url());

        await applyAuthToLocalStorage(page, auth);

        console.log("fixture page.url() after auth =", page.url());
        await use(page);
    },
});

export { expect };
