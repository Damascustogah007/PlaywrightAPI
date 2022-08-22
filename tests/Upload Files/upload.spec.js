const { test } = require("@playwright/test");
const baseURL = "https://www.sendgb.com/";

test.describe("Uploading files", async () => {
  const filePath0 = "file/raf2.txt";
  const filePath1 = "file/raf2 - Copy.txt";
  //Uploading files using  Input
  test("Upload files using Input", async ({ page }) => {
    await page.goto(baseURL);
    await page.setInputFiles("input[name='qqfile']", [filePath0, filePath1]);
    // await page.pause();
  });

  //Uploading files using
  test.only("uploading files using chooser listerner", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.on("filechooser", async (filechooser) => {
      //Filechooser is multiple
      await filechooser.setFiles([filePath0, filePath1]);
    });
    await page.click(".example + div#drag-drop-upload", { force: true });
    await page.pause();
  });
});
