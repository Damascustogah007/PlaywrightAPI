const { test } = require("@playwright/test");
const baseURL = "https://letcode.in/alert";

test.describe("Handling dialogs", async () => {
  test("Prompt alert", async ({ page }) => {
    await page.goto(baseURL);
    const element = await page.$("#prompt");
    page.on("dialog", (dialog) => {
      console.log("Message: " + dialog.message());
      // console.log("Default Values: " + dialog.defaultValue());
      console.log("Message: " + dialog.type());
      dialog.accept("Charles Togah");
    });
    await element?.click();
    await page.pause();
  });
});
