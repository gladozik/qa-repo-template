import { test } from "../../fixtures/auth.fixture";
import { LoginPopupPage } from "../../pages/loginPopupPage/loginPopupPage";
import { MainPage } from "../../pages/mainPage/mainPage";
import { RegisterPage } from "../../pages/registerPage/registerPage";

test.describe("Проверки попапа с авторизацией", () => {
    test("Успешная авторизация", async ({ page, createdUser }) => {
        //arrange
        const loginPopupPage = new LoginPopupPage(page);
        const mainPage = new MainPage(page)
        const email = createdUser.email;
        const password = createdUser.password;

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopupPage.fillLogin(email);
        await loginPopupPage.fillPassword(password);
        await loginPopupPage.clickLoginBtn()

        //assert
        await mainPage.assertUserIsLoggedIn();
    });

    test("Переход на регистрацию по кнопке", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page)
        const registerPage = new RegisterPage(page);

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickRegisterBtn()

        //assert
        await registerPage.assertRegisterPageIsOpen();
    });

    test("Логин с пустыми полями не должен увести на главную", async ({ page }) => {
        //arrange
        const loginPopup = new LoginPopupPage(page);
        const mainPage = new MainPage(page)

        //act
        await mainPage.openMainPage();
        await mainPage.openLoginDesktop();
        await loginPopup.clickLoginBtn();

        //assert
        await loginPopup.assertEmailErrorIsVisible();
        await loginPopup.assertPasswordErrorIsVisible();
    });
});
