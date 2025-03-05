import { Browser, Page } from "@playwright/test";
// const { chromium } = require("playwright");
const { expect, test,chromium } = require("@playwright/test");
import testData from "../testData/testData.json";
const capabilities = [
  {
    browserName: "Chrome",
    browserVersion: "128.0",
    "LT:Options": {
      platform: "Windows 10",
      build: "Playwright-101 certification",
      name: "Playwright Test on Windows 10 - Chrome",
      user: "maram_reddy",
      accessKey: "SCISwXUASTvo70f46ns7enOioeC21SZX4mMzL7RBumPTdykrIe",
      network: true,
      video: true,
      console: true,
    },
  },
  {
    browserName: "MicrosoftEdge",
    browserVersion: "126.0",
    "LT:Options": {
      platform: "macOS Ventura",
      build: "Playwright-101 certification",
      name: "Playwright Test on macOS Ventura- MicrosoftEdge",
      user: "maram_reddy",
      accessKey: "SCISwXUASTvo70f46ns7enOioeC21SZX4mMzL7RBumPTdykrIe",
      network: true,
      video: true,
      console: true,
    },
  },
];

capabilities.forEach(async (capability) => {
  let page: Page;
  let browser:Browser

  test.beforeAll(async()=>{
     browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capability)
      )}`,
    });

  })

  test.beforeEach(async () => {
    
    page = await browser.newPage();

    await page.goto("/selenium-playground");
  });

  test(`Test Scenario1 - Simple Form Demo - ${capability.browserName}-${capability.browserVersion}`, async () => {
    await page.locator('a[href*="simple-form-demo"]').click();
    await expect(page.url()).toContain("simple-form-demo");
    let message = "Welcome to LambdaTest";
    await page.getByPlaceholder("Please enter your Message").fill(message);
    await page.getByRole("button", { name: "Get Checked Value" }).click();
    let actualMessageDisplayed = await page.locator("#message").textContent();
    expect(actualMessageDisplayed).toStrictEqual(message);
  });

  test(`Test Scenario2 - Drag and Drop Slider - ${capability.browserName}-${capability.browserVersion}`, async () => {
    let target = "95";
    await page.locator('a[href*="drag-drop-range-sliders-demo"]').click();
    await page.locator("#slider3").getByRole("slider").fill(target);
    await expect(page.locator("#rangeSuccess")).toHaveText(target);
  });

  test(`Test Scenario3 - Input Form Submit -${capability.browserName}-${capability.browserVersion}`, async () => {
    let submitButton = page.getByRole("button", { name: "Submit" });
    await page.locator('a[href*="input-form-demo"]').click();
    await expect(page.url()).toContain("input-form-demo");
    await submitButton.click();
    await page.locator('input[placeholder="Name"]').fill(testData.name);
    await page.locator("#inputEmail4").fill(testData.email);
    await page.getByPlaceholder("Password").fill(testData.password);
    await page.locator("#company").fill(testData.company);
    await page.locator("#websitename").fill(testData.website);
    await page.locator('select[name="country"]').selectOption(testData.country);
    await page.locator('input[name="city"]').fill(testData.city);
    await page.getByPlaceholder("Address 1").fill(testData.address1);
    await page.locator("#inputAddress2").fill(testData.address2);
    await page.locator('//*[@placeholder="State"]').fill(testData.state);
    await page.locator('//*[@name="zip"]').fill(testData.zipCode);
    await submitButton.click();
    await expect(page.locator("p.success-msg")).toHaveText(
      testData.successMessage
    );
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
});
