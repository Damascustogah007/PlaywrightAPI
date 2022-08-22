const { test, expect } = require("@playwright/test");
const login = require("./Helper.json");

const baseURL = "https://www.saucedemo.com/";

test.describe("SWAG LAB", async () => {
  test("should Log user in", async ({ page }) => {
    await page.goto(baseURL);
    // Verify the title as Swag Labs
    expect(page).toHaveTitle("Swag Labs");
    // Login with standard_user & secret_sauce
    await page.fill("#user-name", login.username);
    await page.fill("#password", login.password);
    const button = page.locator("#login-button");
    await expect(button).toBeVisible();
    // Verify the login button text is capitalized
    await expect(button).toHaveValue("Login");
    await page.click("#login-button");
    await expect(page.url()).toContain("/inventory.html");
    //   Verify default filter dropdown is A-Z
    const sort = await page.locator(".product_sort_container").nth(0);
    await expect(sort).toHaveValue("az");
    await expect(sort).toBeEditable();
    await expect(sort).toBeVisible();
    // Add the first product to the cart
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    // Verify the cart badge has 1 product
    const cartBadge = await page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");
    // Add the last product to the cart
    const countItem = await page.locator(".inventory_item");
    await expect(countItem).toHaveCount(6);
    const lastItem = await page.locator(".inventory_item").last();
    await expect(lastItem).toBeVisible();
    await page.click("[name='add-to-cart-test.allthethings()-t-shirt-(red)']");
    // Verify the cart badge value is increased
    await page.locator("#shopping_cart_container").isVisible();
    await expect(cartBadge).toHaveText("2");
    // Remove the first product from the cart
    await page.click(".shopping_cart_badge");
    await expect(page.url()).toContain("/cart");
    const title = page.locator(".title");
    await expect(title).toHaveText("Your Cart");
    await page.locator("#remove-sauce-labs-backpack").click();
    // Verify the cart badge has 1 product
    await expect(cartBadge).toHaveText("1");
    //  Verify the added product is available
    const quantity = await page.locator(".cart_quantity");
    await expect(quantity).toHaveText("1");
    // Click on the continue shopping
    await page.locator("#continue-shopping").click();
    // Change the price filter from low to high
    const productOptions = await page.locator(".product_sort_container");
    await productOptions.selectOption("lohi");

    // Verify the price sorted properly
  });
});
