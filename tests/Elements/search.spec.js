const { test } = require("@playwright/test");
const baseURL = "https://letcode.in/elements";

test.describe("Searching Elements", async () => {
  test.only("Enter Git username", async ({ page }) => {
    await page.goto(baseURL);
    const header = await page.$("#navbar-menu");
    await header?.screenshot({ path: "header.png" }); //To screenshot only the header
    const element = await page.$("input[name='username']");
    await element?.fill("ortonikc");
    await element?.press("Enter"); //pressing enter on the keyboard
    await page.screenshot({ path: Date.now() + "screenshot1.png" }); //Screenshot of visible DOM
    await page.screenshot({ path: "fs.png", fullpage: true }); //Screenshot the full page
  });

  // test("Print all repos", async ({ page }) => {
  //   await page.waitForSelector("app-gitrepos ol ");
  //   const repos = await page.$$("app-gitrepos ol li");
  //   console.log(repos.length);
  //   // for await
  //   for await (const repo of repos) {
  //     console.log(await repo.innerText());
  //   }
  // });
});

// map
// const allUrls = await Promise.all(repos.map(repo =>{
// return await repo.innerText()
// }))
// console.log(allUrls)
