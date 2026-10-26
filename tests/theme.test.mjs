import test from "node:test";
import assert from "node:assert/strict";
import { resolveInitialTheme } from "../js/theme.js";

test("a first visit follows the device theme", () => {
  assert.equal(resolveInitialTheme(null, true), "dark");
  assert.equal(resolveInitialTheme(null, false), "light");
});

test("a saved manual theme takes priority over the device setting", () => {
  assert.equal(resolveInitialTheme("light", true), "light");
  assert.equal(resolveInitialTheme("dark", false), "dark");
  assert.equal(resolveInitialTheme("unexpected", false), "light");
});
