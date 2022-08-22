const { expect, test } = require("@playwright/test");
let _number = number;
let _sys_id = string;
const short_description = "Keyboard Issue";
const category = "Hardware";

// For creating a new account

test("Post API", async ({ request, baseURL }) => {
  const _response = await request.post(`${baseURL}`, {
    //or body
    data: {
      short_description: short_description,
      category: category,
    },
    // Add header to the global config file
    // This is to indicate what type of data to be received
  });
  expect(_response.status()).toBe(201);
  expect(_response.ok()).toBeTruthy();
  console.log(await _response.json());
  const res = await _response.json(); //To grab the whole array (response body)
  _number = res.result.task_effective_number;
  _sys_id = res.result._sys_id;
  //output as xml
  //   console.log((await _response.body()).toString())
});

// test("", ({page}) => {
//     const _response = await page.request.get("")
// })

test("Get API", async ({ request, baseURL }) => {
  const _response = await request.get(`${baseURL}`, {
    params: {
      task_effective_number: _number,
      sysparm_fields: `${short_description}, ${category}`,
    },
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  expect(await _response.json()).toMatchObject({
    result: [{ short_description: short_description, category: category }],
  });
});

test("Update API", async ({ request, baseURL }) => {
  const _response = await request.put(`${baseURL}/${_sys_id}`, {
    data: {
      short_description: "Very boring tutorial",
      category: "Software",
    },
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
  expect(await _response.json()).toMatchObject({
    result: [{ short_description: short_description, category: category }],
  });
});

test("Delete API", async ({ request, baseURL }) => {
  const _response = await request.delete(`${baseURL}/${_sys_id}`, {});
  expect(_response.status()).toBe(204);
  expect(_response.ok()).toBeTruthy();
});

//npm run report
//Will execute test and provide the test report
