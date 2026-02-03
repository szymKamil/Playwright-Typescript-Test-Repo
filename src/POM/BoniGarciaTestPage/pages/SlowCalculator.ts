import { Locator } from "@playwright/test";
import MainPage from "./MainPage";

export class SlowCalculator extends MainPage {
  readonly delayInput: Locator;
  readonly btnCalculator: Locator;

  constructor(page) {
    super(page);
    this.delayInput = page.locator("#delay");
    this.btnCalculator = page.locator("btn.btn-outline-primary");
  }
}
