import { BrowserContext, Locator, Page } from "@playwright/test";
import MainPage from "./MainPage";



export class NotificationPage extends MainPage{

    readonly notificationBtn: Locator;
    readonly context: BrowserContext;

    constructor(page: Page){
        super(page);
        this.notificationBtn = page.getByText('Notify me');
        this.context = page.context();
    }

    public async notifyMe(){
        await this.notificationBtn.click();
    }

}