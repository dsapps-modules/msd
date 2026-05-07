import test from "node:test";
import assert from "node:assert/strict";
import { loadRouteManifest } from "./route-manifest.mjs";

test("route manifest loads all configured routes", () => {
  const routes = loadRouteManifest();

  assert.ok(routes.length >= 20);
  assert.ok(routes.some((route) => route.path === "/"));
  assert.ok(routes.some((route) => route.path === "/webHomeScreen"));
});

test("route manifest keeps routes deep-linkable for preview mode", () => {
  const routes = loadRouteManifest();
  const checkout = routes.find((route) => route.path === "/checkoutScreens");
  const login = routes.find((route) => route.path === "/loginPage");

  assert.equal(checkout?.requiresExtra, false);
  assert.equal(login?.requiresExtra, false);
});
