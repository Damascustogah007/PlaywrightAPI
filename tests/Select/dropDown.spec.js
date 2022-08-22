const { test, expect } = require("@playwright/test");
const baseURL = "https://letcode.in/dropdowns";

test.describe("Handling Select", async () => {
  test("Select dropdown based on value", async ({ page }) => {
    await page.goto(baseURL);
    const fruits = await page.$("#fruits");
    await fruits?.selectOption("2");
    const msg = await page.$("div.notification.is-success");
    expect(await msg?.textContent()).toContain("Orange");
  });

  test("Select multiple ", async ({ page }) => {
    const heros = await page.$("#superheros");
    await heros?.selectOption([
      { label: "Aquaman" },
      { value: "ta" },
      { index: 8 },
    ]);
  });

  test("Count of the select", async ({ page }) => {
    const lang = await page.$$("id=lang option");
    console.log(await lang.length)
    // for(let i = 0; i < lang.length; i++){
    //   console.log(await lang[i].innerText())
    // }
    // await expect(lang).toHaveLength(5);
  });

  // test('get selected text', async({ page }) => {
  //   await page.selectOption("#country", "India")
  //   const text = page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)
  //   console.log(text)
  //   expect(text).toBe("India")

  // })
});
