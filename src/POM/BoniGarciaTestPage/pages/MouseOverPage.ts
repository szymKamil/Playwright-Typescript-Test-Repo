import { Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export class MouseOverPage extends MainPage {
  readonly compassImg: Locator;
  readonly calsendarImg: Locator;
  readonly awardImg: Locator;
  readonly landscapeImg: Locator;

  constructor(page: Page) {
    super(page);

    this.compassImg = page.locator('img[src="img/compass.png"]');
    this.calsendarImg = page.locator('img[src="img/calendar.png"]');
    this.awardImg = page.locator('img[src="img/award.png"]');
    this.landscapeImg = page.locator('img[src="img/landscape.png"]');
  }

  public async mouseOverImg(): Promise<void> {
    const elements = [
      this.compassImg,
      this.calsendarImg,
      this.awardImg,
      this.landscapeImg,
    ];
    const imgCapctions = ["Compass", "Calendar", "Award", "Landscape"];

    for (const [index, element] of elements.entries()) {
      await element.hover();
      const imgCaption = await this.page
        .getByText(imgCapctions[index])
        .textContent();
      console.log(`Hovered element #${index+1}: ${imgCaption}`);
    }
  }
}
