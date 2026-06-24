
import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage {

    //private Locators: 
    private readonly searchResults: Locator;


    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.searchResults = page.locator('div.product-layout');
    };

    //actions:
    async getProductSearchResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();
    }


}