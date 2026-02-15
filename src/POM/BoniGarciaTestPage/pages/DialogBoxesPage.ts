import { expect, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";

export enum AlertParameter {
  Accept = "accept",
  Dismiss = "dismiss",
}

interface AlertConfig {
  btn: Locator;
  parameter: AlertParameter;
  input?: string;
}

export class DialgBoxesPage extends MainPage {
  private readonly launchAlertBtn: Locator;
  private readonly launchConfirmBtn: Locator;
  private readonly launchPromptBtn: Locator;
  private readonly launchModalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.launchAlertBtn = this.page.locator("#my-alert");
    this.launchConfirmBtn = this.page.locator("#my-confirm");
    this.launchPromptBtn = this.page.locator("#my-prompt");
    this.launchModalBtn = this.page.locator("#my-modal");
  }

  async alertRunner(alertConfig: AlertConfig) {
    this.page.once("dialog", async (alert: any) => {
      console.log("Dialog type:", alert.type());
      console.log("Dialog message:", alert.message());
      let alertMsg = await alert.message();
      console.log("Alert message is " + alertMsg);
      if (alertConfig.parameter === "accept" || alertConfig.input) {
        await alert.accept(alertConfig.input);
      } else {
        await alert.dismiss();
      }
    });
    await alertConfig.btn.click();
  }

  public async launchAlert() {
    await this.alertRunner({
      btn: this.page.locator("#my-alert"),
      parameter: AlertParameter.Dismiss,
    });
  }

  public async launchConfirm(parameter: AlertParameter) {
    await this.alertRunner({
      btn: this.page.locator("#my-confirm"),
      parameter: parameter,
    });
  }
  public async launchPromt(parameter: AlertParameter, input: string) {
    await this.alertRunner({
      btn: this.launchPromptBtn,
      parameter: parameter,
      input: input,
    });
  }
  public async launchModal(parameter: AlertParameter, input: string) {
    //TODO:
  }
}
