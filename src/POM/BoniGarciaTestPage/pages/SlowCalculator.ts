import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";
import { ar } from "@faker-js/faker";

export class SlowCalculator extends MainPage {
  readonly delayInput: Locator;
  readonly calculationResult: Locator;
  readonly calculatorSpace: Locator;

  constructor(page: Page) {
    super(page);
    this.delayInput = page.locator("#delay");
    this.calculationResult = page.locator(".screen");
    this.calculatorSpace = page.locator("#calculator");
  }

  async setDelay(delay: number): Promise<void> {
    await this.delayInput.fill(delay.toString());
  }


  async calculate(calculation: string): Promise<void> {
    let array = calculation.split("");
    for (let i = 0; i < array.length; i++) {
      switch (array[i]) {
          case "*":
            array[i] = "x";
            break;
          case "/":
            array[i] = "÷";
            break;
          default:
            array[i];
      }
      await this.calculatorSpace.locator(`//span[text()="${array[i]}"]`).click();
    }
    await this.calculatorSpace.locator(`//span[text()="="]`).click();
    await expect(this.calculationResult).not.toHaveText(calculation);
    await expect(this.calculationResult).toContainText(/\d+/);
    let result = await this.calculationResult.textContent();
    console.log("Wynik działania to: " + result);
    }
}

