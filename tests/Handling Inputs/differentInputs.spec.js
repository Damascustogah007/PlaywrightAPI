const { test } = require("@playwright/test");
const baseURL = "https://letcode.in/edit";

test.describe("Handling Inputs", async () => {
  test("Enter full name", async ({ page }) => {
    await page.goto(baseURL);
    const name = await page.$("#fullName");
    await name?.type("Charles Togah");
  });
  test("Append a text and press keyboard tab", async ({ page }) => {
    const join = await page.$("#join");
    await join?.focus();
    await page.keyboard.press("End");
    await join?.type(" Human");
  });
  //   test("What is inside a text-box", async ({ page }) => {
  //     const text = await page.getAttribute("#getMe", "value");
  //     console.log(text);
  //   });
  test("Clear the text  ", async ({ page }) => {
    await page.$("#clearMe", "");
  });
});
