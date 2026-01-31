import { Page, Locator, expect } from "@playwright/test";

export default class MainPage {
  readonly mainHeader: Locator;
  readonly logoImg: Locator;
  readonly cardBody: Locator;
  readonly subPageBtn: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.mainHeader = page.locator("h1.display-4");
    this.logoImg = page.locator("img.img-fluid");
    this.cardBody = page.locator("div.card-body");
    this.subPageBtn = page.locator("a.btn.btn-outline-primary.mb-2");
  }

  async verifyMainPageElements(): Promise<void> {
    await expect(this.mainHeader).toBeVisible();
    await expect(this.logoImg).toBeVisible();
    await expect(this.cardBody).toHaveCount(6);
    await expect(this.subPageBtn).toHaveCount(27);
  }

  async openPage(btnName: string): Promise<void> {
    let btn = this.subPageBtn.filter({ hasText: btnName });
    await expect(btn).toHaveCount(1);
    await btn.first().click();
  }

  async openMainPage(): Promise<void> {
    await this.page.goto("https://bonigarcia.dev/selenium-webdriver-java/");
  }
}
