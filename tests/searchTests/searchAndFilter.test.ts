import { test } from "../../fixtures/auth.fixture";
import { SearchPage } from "../../pages/searchPage/searchPage";

test("Поиск и фильтрация объявлений по цене", async ({ page, authWithTwoAds}) => {
    //arrange
    const searchPage = new SearchPage(page);
    const searchInput = authWithTwoAds.ads[0].title;
    const excpectedSearchAds = 2;

    //act
    await searchPage.openSearchPage();
    await searchPage.fillSearchInput(searchInput);
    await searchPage.openSortDropdown();
    await searchPage.sortExpensiveFirst();

    //assert
    await searchPage.assertSearchResultsNumber(excpectedSearchAds);
    await searchPage.assertFirstAdPriceGreaterThanSecondAdPrice();
});
