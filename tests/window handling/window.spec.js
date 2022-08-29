const { test, expect } = require("@playwright/test");
const baseURL = "https://letcode.in/windows";

test.describe("Page handling", () => {
  test("Navigate to another tab", async ({ page }) => {
    await page.goto(baseURL);
    const [newWindow] = await Promise.all([
      page.waitForEvent("popup"),
      await page.click("#home"),
    ]);
    await newWindow.waitForLoadState();
    expect(newWindow.url()).toContain("test");
    await newWindow.click('"Log in"');
    expect(newWindow.url()).toContain("signin");
    // await newWindow.close()
    await page.bringToFront();
    await page.click("letxpath");
  });

  test.only("Open multiple tab", async ({ page }) => {
    await page.goto(baseURL);
    const [multiPage] = await Promise.all([
      page.waitForEvent("popup"),
      await page.click("#multi"),
    ]);
    await multiPage.waitForLoadState();
    const allWindows = multiPage.context().pages();
    console.log("no.of windows: " + allWindows.length);
    allWindows.forEach((page) => {
      console.log(page.url());
    });
    await allWindows[1].bringToFront();
    allWindows[1].on("dialog", (dialog) => {
      console.log("Message: " + dialog.message());
      dialog.accept();
    });
    await allWindows[1].click("id=accept");
    await page.pause()
  });
});
