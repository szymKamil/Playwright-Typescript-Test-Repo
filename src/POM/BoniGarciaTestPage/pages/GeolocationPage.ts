import { BrowserContext, expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class GeolocationPage extends MainPage {
  readonly getGeBtn: Locator;
  readonly coordinatesInfo: Locator;
  private context: BrowserContext;

  constructor(page: Page) {
    super(page);
    this.getGeBtn = this.page.getByText("Get coordinates");
    this.coordinatesInfo = this.page.locator("#id");
    this.context = page.context();
  }

  public async getCoordinates(): Promise<void> {
    await this.getGeBtn.click();
  }

  public async verifyCoords(coords?: { longitude: number; latitude: number }) {
    if (coords) {
      await expect(this.page.locator("#coordinates")).toContainText(
        String(coords?.longitude),
      );
      await expect(this.page.locator("#coordinates")).toContainText(
        String(coords?.latitude),
      );
    } else {
      await expect(this.page.locator("#coordinates")).toContainText(
        "Latitude: 66.66°",
      );
      await expect(this.page.locator("#coordinates")).toContainText([
        "Longitude: 99.99°",
      ]);
    }
  }

  public async changeGeolocation({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) {
    await this.context.setGeolocation({
      longitude: longitude,
      latitude: latitude,
    });
    return { longitude, latitude };
  }
}
