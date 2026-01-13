import { test as base, expect, Page, request as pwRequest, APIRequestContext } from '@playwright/test';
import { registerUser, login } from '../helpers/authHelper';
import { applyAuthToLocalStorage } from '../helpers/authSetStorageHelper';
import { AuthResponse, RegisterDto } from "../helpers/types";
import { createAd, deleteAd, createAds, deleteAds } from "../helpers/adHelper";

const TEST_DESCRIPTION = 'Объявление создано автоматически'
const API_BASE = 'https://testboard.avito.com';

type User = RegisterDto;

function uniqueEmail() {
    return `user_${Date.now()}@example.com`;
}

function uniqueAdTitle() {
    return `Тестовое объявление ${Date.now()}`;
}

type Fixtures = {
    api: APIRequestContext;
    createdUser: User;
    auth: AuthResponse;
    authedPage: Page;
    authWithAd: { ad: any };
    authWithTwoAds: { ads: any[] };
};

export const test = base.extend<Fixtures>({
    api: async ({}, use) => {
        const api = await pwRequest.newContext({
            baseURL: API_BASE,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
            },
        });

        await use(api);
        await api.dispose();
    },

    createdUser: async ({ api }, use) => {
        const user: User = {
            first_name: 'Иван',
            last_name: 'Петров',
            email: uniqueEmail(),
            password: 'Somepassword123',
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
        console.log('fixture page.url() before auth =', page.url());

        // Предлагаю это добавить по дефолту, у меня заняло немало времени чтобы пофиксить
        // Прокидываем заголовок авторизации для всех API запросов, т.к. в сценариях слетала авторизация
        await page.context().route('**/api/**', async (route) => {
            const req = route.request();
            const headers = {
            ...req.headers(),
            authorization: `Bearer ${auth.token}`,
            };
            await route.continue({ headers });
        });

        await applyAuthToLocalStorage(page, auth);

        console.log('fixture page.url() after auth =', page.url());
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
            await deleteAd(api, auth.token, ad);
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

export { expect };
