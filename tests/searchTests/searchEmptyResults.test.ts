import { test } from "../../fixtures/auth.fixture";
import { SearchPage } from "../../pages/searchPage/searchPage";

test("Отображение заглушки при пустой выдаче в поиске", async ({ page }) => {
    //arrange
    const searchPage = new SearchPage(page);

    //act
    await searchPage.openSearchPage();
    await searchPage.fillSearchInput(`Test-${Date.now()}`);

    //assert
    await searchPage.assertEmptyResultStubIsVisible();
});
