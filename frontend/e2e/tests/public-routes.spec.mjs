import { test, expect } from "@playwright/test";
import { loadRouteManifest } from "../route-manifest.mjs";

const deepLinkableRoutes = loadRouteManifest().filter(
  (route) => route.path && !route.requiresExtra,
);
const knownFrameworkErrors = [
  "BindingError: Expected null or instance of Typeface, got an instance of Typeface",
  "Error",
];

for (const route of deepLinkableRoutes) {
  test(`smoke: ${route.path}`, async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    await expect(page.locator("body")).toBeVisible();

    const fatalErrors = pageErrors.filter(
      (message) =>
        !message.includes("ResizeObserver loop completed") &&
        !message.includes("Script error.") &&
        !knownFrameworkErrors.some((knownError) => message.includes(knownError)),
    );

    expect(fatalErrors).toEqual([]);
  });
}
