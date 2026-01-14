import { test } from "../../fixtures/auth.fixture";
import { MyAdsPage } from "../../pages/myAdsPage/myAdsPage";
import { MainPage } from "../../pages/mainPage/mainPage";
import { DeleteModalPage } from "../../pages/deleteModalPage/deleteModalPage";

test("Удаление объявления", async ({ authedPage, authWithAd }) => {
    // arrange
    const itemTitle = authWithAd.ad.title;
    const mainPage = new MainPage(authedPage);
    const myAds = new MyAdsPage(authedPage);
    const deleteModal = new DeleteModalPage(authedPage);

    // act
    await mainPage.openMainPage();
    await myAds.openMyAdsPage();
    await myAds.assertItemWithTitleVisible(itemTitle);
    await myAds.openAdMenuByTitle(itemTitle);
    await myAds.clickDeleteInAdMenu();
    await deleteModal.clickConfirmDeleteButton();
    await authedPage.reload();

    // assert
    await myAds.assertItemWithTitleNotExists(itemTitle);
});
