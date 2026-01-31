import { test } from "@playwright/test";
import MainPage from "../../src/POM/BoniGarciaTestPage/pages/MainPage";
import WebForm from "../../src/POM/BoniGarciaTestPage/pages/WebFormPage";
import NavigationPage from "../../src/POM/BoniGarciaTestPage/pages/NavigationPage";
import { DropdownMenuPage } from "../../src/POM/BoniGarciaTestPage/pages/DropdownMenuPage";
import { MouseOverPage } from "../../src/POM/BoniGarciaTestPage/pages/MouseOverPage";
import { DragAndDrop } from "../../src/POM/BoniGarciaTestPage/pages/DragAndDrop";
import { DrawInCanvas } from "../../src/POM/BoniGarciaTestPage/pages/DrawInCanvas";

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

test("Drodpown page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Dropdown menu");
  const dropdownPage = new DropdownMenuPage(page);
  await dropdownPage.openDropdownMenuPage(dropdownPage.leftBtnDropdown, "left");
  await dropdownPage.openDropdownMenuPage(
    dropdownPage.rightBtnDropdown,
    "right",
  );
  await dropdownPage.openDropdownMenuPage(
    dropdownPage.doubleClickBtnDropdown,
    "double",
  );
});

test("Mouse over page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Mouse over");
  const mouseOverPage = new MouseOverPage(page);
  await mouseOverPage.mouseOverImg();
});

test("Drag and drop page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Drag and drop");
  const dragAndDropPage = new DragAndDrop(page);
  await dragAndDropPage.dragAndDropPanel();
});


test("Draw in canvas page test", async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openMainPage();
  await mainPage.openPage("Draw in canvas");
  const drawInCanvas = new DrawInCanvas(page);
  await drawInCanvas.defaultDraw();
  await drawInCanvas.drawInCanvas({x: 0, y: -30}, {x: 30, y: 30}, {x: -15, y: 30}, {x: 20, y: -60});
});
