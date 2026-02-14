import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class ShadowDOM extends MainPage {
  readonly shadowDOMparagraph: Locator;

  constructor(page: Page) {
    super(page);
    this.shadowDOMparagraph = page.locator("p");
  }

  public async getTextFromShadowDOM(): Promise<string> {
    const text = await this.shadowDOMparagraph.textContent();
    console.log(`Text from Shadow DOM: ${text}`);
    return text || "Error: Text content is null";
  }
}
