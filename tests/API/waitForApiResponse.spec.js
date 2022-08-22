const { test, expect } = require("@playwright/test");

test("Read API response", async ({ page }) => {
  await page.goto("https://letcode.in/elements");

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.status() == 200),
    page.fill("input[name='username']", "ortonikc"),
    page.click("button"),
  ]);
  console.log(await response.json());
  const res = await response.json();
  expect(res.login).toEqual("ortoniKC");
  expect(res.name).toContain("Koushik");
});
