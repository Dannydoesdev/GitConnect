import { TestEnvironment } from "jest-environment-jsdom";
import MockAdapter from "axios-mock-adapter"
import { renderNav } from "../js/components/navbar";
import * as fs from "fs";
import * as path from "path"
const mockAxios = new MockAdapter(axios)
const response = ({status:"ok"})
const html = fs.readFileSync(path.resolve("./client/index.html"), "utf8");

describe("index.html test suite", () => {
  it("My index.html Test", () => {
    expect(true).toEqual(true);
  });
});

test("renderNav", () => {
  document.body.innerHTML = html;
  mockAxios.onGet('/api/session')
    .reply(200, response)
  
  expect(response.status).toEqual("ok")
  renderNav();
  expect(1 + 2).toEqual(3);
});
