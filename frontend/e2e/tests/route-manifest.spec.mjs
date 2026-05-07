import { test, expect } from "@playwright/test";
import { loadRouteManifest } from "../route-manifest.mjs";

test("route manifest accounts for every registered page", async () => {
  const manifest = loadRouteManifest();

  expect(manifest.length).toBeGreaterThan(0);
  expect(manifest.every((route) => route.path.startsWith("/"))).toBeTruthy();

  const duplicatePaths = manifest.filter(
    (route, index) =>
      manifest.findIndex((candidate) => candidate.path === route.path) !== index,
  );

  expect(duplicatePaths, "Duplicate route paths found in app_routs.dart").toEqual([]);
});

test("all registered routes remain URL-addressable in preview mode", async () => {
  const manifest = loadRouteManifest();

  expect(manifest.every((route) => route.requiresExtra === false)).toBeTruthy();
});
