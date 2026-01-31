import { expect, Locator, Page } from "@playwright/test";

export default class NavigationPage {
  readonly page: Page;
  readonly lead: Locator;
  readonly buttons: Locator;
  readonly test1: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  readonly test2: string = `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
  readonly test3: string = `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  constructor(page: Page) {
    this.page = page;
    this.lead = page.locator("p.lead");
    this.buttons = page.locator("li.page-item");
  }

  public async verifyNavigationPage(): Promise<void> {
    let textArray = [this.test1, this.test2, this.test3];
    for (let i = 1; i < 5; i++) {
      let btn = await this.buttons.nth(i).getAttribute("class");
      console.log(btn);
      expect(
        this.page.getByRole("main").filter({ hasText: textArray[i--] }),
      ).toBeTruthy();
      if (i < 4) {
        await this.buttons.nth(i++).click();
      }
    }
  }
}
