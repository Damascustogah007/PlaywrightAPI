const { test } = require("@playwright/test");
const baseURL = "https://letcode.in/frame";

test.describe("Frames", async () => {
  test("Interact with frames", async ({ page }) => {
    await page.goto(baseURL);
    const frame = page.frame({ name: "firstFr" });
    await frame?.fill("input[name='fname']", "Charles");
    await frame?.fill("input[name='lname']", "Togah");
    //inner frame in the parent frame
    const frames = frame.childFrames();
    //no of frames
    console.log("No. of frames: " + frames.length);
    //identify each frame by the index
    await frames[0].fill("input[name='email']", "koushi@mail.com");
    //Return to parent frame
    const parent = frames[0].parentFrame();
    await parent?.fill("input[name='lname']", "Youtube");
    await page.pause();
  });
});
