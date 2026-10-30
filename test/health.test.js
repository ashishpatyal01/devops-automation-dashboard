const test = require("node:test");
const assert = require("node:assert/strict");

test("project declares the expected start and test scripts", () => {
  const pkg = require("../package.json");
  assert.equal(pkg.scripts.start, "node server.js");
  assert.equal(pkg.scripts.test, "node --test");
});
