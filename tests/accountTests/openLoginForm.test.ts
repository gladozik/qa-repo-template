import { test } from "@playwright/test";
import {LoginPopupPage} from "../../pages/loginPopupPage/loginPopupPage";
import {MainPage} from "../../pages/mainPage/mainPage";
import {RegisterPage} from "../../pages/registerPage/registerPage";

test.describe("Проверки попапа с авторизацией", () => {
    test("Успешная авторизация", async ({ page }) => {
        //arrange
        const loginPopupPage = new LoginPopupPage(page);
        const mainPage = new MainPage(page);
        const email = process.env.E2E_USER_EMAIL;
        const password = process.env.E2E_USER_PASSWORD;

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopupPage.fillLogin(email);
        await loginPopupPage.fillPassword(password);
        await loginPopupPage.clickLoginBtn();

        //assert
        await mainPage.assertUserIsLoggedIn();
    });

    test("переход на регистрацию по кнопке", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickRegisterBtn();

        //assert
        await registerPage.assertRegisterPageURL();
    });

    test("логин с пустыми полями не должен увести на главную", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickLoginBtn();

        //assert
        await loginPopup.assertEmailErrorIsVisible();
        await loginPopup.assertPasswordErrorIsVisible();
    });
});
