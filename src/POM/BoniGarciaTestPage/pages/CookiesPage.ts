import { BrowserContext, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class CookiesPage extends MainPage {
  readonly displayCookiesBtn: Locator;
  readonly cookieInfo: Locator;
  readonly context: BrowserContext;

  constructor(page: Page) {
    super(page);
    this.displayCookiesBtn = page.locator("#refresh-cookies");
    this.cookieInfo = page.locator("#cookies-list");
    this.context = page.context();
  }

  public async displayCookies(): Promise<void> {
    await this.displayCookiesBtn.click();
  }

  public async printCookiesInfo(): Promise<void> {
    const cookiesText = await this.cookieInfo.textContent();
    console.log(`Cookies info: ${cookiesText}`);
  }

  public async changeCookie(
    ...cookies: Array<{ name: string; value: string }>
  ): Promise<void> {
    await this.page.goto(
      "https://bonigarcia.dev/selenium-webdriver-java/cookies.html",
    );
    await this.context.clearCookies();

    let formatedCookie = cookies.map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: "bonigarcia.dev",
      path: "/",
    }));
    await this.context.addCookies(formatedCookie);
  }
}
