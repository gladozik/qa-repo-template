import { test } from "@playwright/test";
import {RegisterPage} from "../../pages/registerPage/registerPage";
import {MainPage} from "../../pages/mainPage/mainPage";

test("Регистрация пользователя", async ({ page }) => {
    //arrange
    const registerPage = new RegisterPage(page);
    const mainPage = new MainPage(page);
    const uniq = Date.now();
    const email = `gedeon.qa+${uniq}@example.ru`;

    //act
    await registerPage.openRegisterPage();
    await registerPage.register({
        firstName: "Гедеон",
        lastName: "Гедеоныч",
        email,
        password: "Password123",
        birthdate: "1999-01-01",
    });

    //assert
    await mainPage.assertUserIsLoggedIn();
});
