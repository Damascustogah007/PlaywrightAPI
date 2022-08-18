const { expect, test } = require("@playwright/test");
let _number = number;

// For creating a new account

test.only("Post API", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}`, {
    data: {
      short_description: "Hello Man",
      category: "hardware",
    },
  });
  expect(_response.status()).toBe(201);
  expect(_response.ok()).toBeTruthy();
  console.log(await _response.json());
  const res = await _response.json(); //To grab the whole array (response body)
  _number = res.result.task_effective_number;
});

test("Get API", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}`, {
    params: {
      task_effective_number: _number,
      sysparm_fields: "short_description. category",
    },
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200)
});
