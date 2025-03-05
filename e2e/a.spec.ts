import { Page } from "@playwright/test";

const { chromium } = require("playwright");
const { expect, test,browser } = require("@playwright/test");
import testData from '../testData/testData.json'
const capabilities = [
  {
    browserName: "Chrome",
    browserVersion: "133.0",
    "LT:Options": {
      platform: "Windows 10",
      build: "Playwright Sample Build",
      name: "Playwright Sample Test on Windows 10 - Chrome",
      user: "maram_reddy",
      accessKey: "SCISwXUASTvo70f46ns7enOioeC21SZX4mMzL7RBumPTdykrIe",
      network: true,
      video: true,
      console: true,
    },
  },
  {
    browserName: "MicrosoftEdge",
    browserVersion: "130.0",
    "LT:Options": {
      platform: "macOS Ventura",
      build: "Playwright Sample Build",
      name: "Playwright Sample Test on macOS Ventura- MicrosoftEdge",
      user: "maram_reddy",
      accessKey: "SCISwXUASTvo70f46ns7enOioeC21SZX4mMzL7RBumPTdykrIe",
      network: true,
      video: true,
      console: true,
    },
  },
  {
    browserName: "pw-firefox",
    browserVersion: "130.0",
    "LT:Options": {
      platform: "Windows 11",
      build: "Playwright Sample Build",
      name: "Playwright Sample Test on Windows 11 - pw-firefox",
      user: "maram_reddy",
      accessKey: "SCISwXUASTvo70f46ns7enOioeC21SZX4mMzL7RBumPTdykrIe",
      network: true,
      video: true,
      console: true,
    },
  },
];



// capabilities.forEach(async (capability) => {
    let page:Page ;
   
        test.beforeEach(async () => {
         const browser = await chromium.launch({ headless: false });
            //  await chromium.connect({
            //     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
            //   })
               page = await browser.newPage()
            
              await page.goto('/selenium-playground',{waitUntil:"networkidle"})
        })
//${capability.browserName}-${capability.browserVersion}
        test(`Test Scenario1 - Simple Form Demo -`, async ()=>{
            await page.getByText('Simple Form Demo').click()
            await expect( page.url()).toContain('simple-form-demo')
            let message = 'Welcome to LambdaTest'
            await page.getByPlaceholder('Please enter your Message').fill(message)
            await page.getByRole('button',{name:'Get Checked Value'}).click()
            let actualMessageDisplayed = await page.locator('#message').textContent()
            expect(actualMessageDisplayed).toStrictEqual(message)

        })

        test.only(`Test Scenario3 - Input Form Submit -`, async ()=>{
          let submitButton = page.getByRole('button',{name:'Submit'})
          await page.getByText('Input Form Submit').click()
          await submitButton.click()
          await page.getByPlaceholder('Name').fill(testData.name)
          await page.getByPlaceholder('Email').fill(testData.email)
          await page.getByPlaceholder('Password').fill(testData.password)
          await page.locator('#company').fill(testData.company)
          await page.locator('#websitename').fill(testData.website)
          await page.selectOption('select[name="country"]',{value:testData.country})
          await page.locator('input[name="city"]').fill(testData.city)
          await page.getByPlaceholder('Address 1').fill(testData.address1)
          await page.locator('#inputAddress2').fill(testData.address2)
          await page.locator('//*[@placeholder="State"]').fill(testData.state)
          await page.locator('//*[@name="zip"]').fill(testData.zipCode)
          await submitButton.click()
          await page.pause()

        

        })

        test.afterEach(async ({browser}) => {
            await browser.close();
            
          });
    // })

