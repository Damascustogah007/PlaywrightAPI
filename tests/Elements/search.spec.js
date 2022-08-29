const { test } = require("@playwright/test");
const baseURL = "https://letcode.in/elements";

test.describe("Searching Elements", async () => {
  test("Enter Git username", async ({ page }) => {
    await page.goto(baseURL);
    const element = await page.$("input[name='username']");
    await element?.fill("ortonikc");
    await element?.press("Enter"); //pressing enter on the keyboard
  });

  test("Print all repos", async ({ page }) => {
    // await page.waitForSelector("app-gitrepos ol ");
    const repos = await page.$$("app-gitrepos ol li");
    console.log(repos.length);
    // for await
    for await (const repo of repos) {
      console.log(await repo.innerText());
    }
    // map
    // const allUrls = await Promise.all(repos.map(repo =>{
    // return await repo.innerText()
    // }))
    // console.log(allUrls)
  });
});
