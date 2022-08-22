const { test, expect } = require("@playwright/test");
let title = String;
let body = String;

test.describe("API for placeholder site", () => {
  test.skip("Create a new user", async ({ request, baseURL }) => {
    const _response = await request.post(`${baseURL}/posts`, {
      data: {
        userId: 11,
        title: "agbe kjcnskvjn jsnddvknskjvn jnsdvolsvns",
        body: " I am a boy kjfdnlskzj jjfnvsklknslzf.v jnfvslkmvlk.s ksnlvnsldv  iosvlnlksv oisdknvli oisdjnovl ",
      },
    });
    console.log(await _response.json());
    expect(await _response.status()).toBe(201);
    expect(await _response.ok()).toBeTruthy();
    const res = await _response.json();
    expect(await res.id).toEqual(101);
    expect(await res.title).toContain("agbe");
  });

  test("Create a get user", async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}/comments`, {});
    expect(await _response.status()).toBe(200);
    expect(await _response.ok()).toBeTruthy();
    // console.log(await _response.json());
    const res = await _response.json();
    for (let i = 0; i <= res.length; i++) {
      const name = res.body.name;
      return name;
    }
  });
});


