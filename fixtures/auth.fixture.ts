import {
    test as base,
    expect,
    Page,
    request as pwRequest,
    APIRequestContext,
} from "@playwright/test";
import { login } from "../helpers/authHelper";
import { applyAuthToLocalStorage } from "../helpers/authSetStorageHelper";
import {AuthResponse, CreateAdResDto} from "../helpers/types";
import {createAd, createAds, deleteAd, deleteAds} from "../helpers/adHelper";

type Fixtures = {
    api: APIRequestContext;
    auth: AuthResponse;
    authedPage: Page;
    authWithAd: { ad: CreateAdResDto };
    authWithTwoAds: { ads: CreateAdResDto[] };
};

const API_BASE = "https://testboard.avito.com";
const TEST_DESCRIPTION = "Объявление создано автоматически";

export const test = base.extend<Fixtures>({
    api: async ({ request: _request }, use) => {
        const api = await pwRequest.newContext({
            baseURL: API_BASE,
            extraHTTPHeaders: {
                "Content-Type": "application/json",
            },
        });

        await use(api);
        await api.dispose();
    },
    auth: async ({ api }, use) => {
        const email = process.env.E2E_USER_EMAIL;
        const password = process.env.E2E_USER_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "Missing env creds: set E2E_USER_EMAIL and E2E_USER_PASSWORD in .env"
            );
        }

        const auth = await login(api, { email, password });
        await use(auth);
    },

    authedPage: async ({ page, auth }, use) => {
        console.log("fixture page.url() before auth =", page.url());

        await applyAuthToLocalStorage(page, auth);

        console.log("fixture page.url() after auth =", page.url());
        await use(page);
    },

    // Фикстура для создания объялвения от пользователя
    authWithAd: async ({ api, auth }, use) => {
        const title = uniqueAdTitle();
        const description = TEST_DESCRIPTION;
        const price = 123;

        const ad = await createAd(api, auth.token, {
            title,
            description,
            price,
        });

        try {
            await use({ ad });
        } finally {
            await deleteAd(api, auth.token, ad.id);
        }
    },

    // Фикстура создания нескольких объявлений
    authWithTwoAds: async ({ api, auth }, use) => {
        const baseTitle = uniqueAdTitle();
        const dtos = [
            { title: baseTitle, description: TEST_DESCRIPTION, price: 111 },
            { title: baseTitle, description: TEST_DESCRIPTION, price: 222 },
        ];

        const ads = await createAds(api, auth.token, dtos);

        try {
            await use({ ads });
        } finally {
            await deleteAds(api, auth.token, ads);
        }
    }
});

function uniqueAdTitle() {
    return `Тестовое объявление ${Date.now()}`;
}

export { expect };
