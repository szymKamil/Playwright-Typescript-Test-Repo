import {  test } from "@playwright/test";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import WebForm from "../../src/POM/BoniGarciaTestPage/pages/WebFormPage";
import NavigationPage from "../../src/POM/BoniGarciaTestPage/pages/NavigationPage";

test("Main page test - verification of visibility of elements", async ({
  page,
}) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.verifyMainPageElements();
});

test("Web form test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Web form");
  const webForm = new WebForm(page);
  await webForm.verifyWebFormPageElements();
  await webForm.fillWebForm({ range: 0 });
  await webForm.sendForm();
});

test("Navigation page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Navigation");
  const navigationPage = new NavigationPage(page);
  await navigationPage.verifyNavigationPage();
});
