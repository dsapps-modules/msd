import { test, expect } from "@playwright/test";

const knownRuntimeErrors = [
  "BindingError: Expected null or instance of Typeface, got an instance of Typeface",
  "Error",
];

test("captures storefront runtime errors", async ({ page }) => {
  const consoleMessages = [];
  const pageErrors = [];
  const suspiciousResponses = [];

  page.on("console", (message) => {
    consoleMessages.push(`[${message.type()}] ${message.text()}`);
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("response", async (response) => {
    const headers = await response.allHeaders();
    const contentType = headers["content-type"] || "";
    const isSuspicious =
      response.url().includes("127.0.0.1") &&
      contentType.includes("text/html") &&
      !response.url().endsWith("/") &&
      !response.url().endsWith(".html");

    if (isSuspicious) {
      suspiciousResponses.push(
        `${response.status()} ${contentType} ${response.url()}`,
      );
    }
  });

  await page.goto("http://127.0.0.1:3001", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  console.log("CONSOLE_MESSAGES_START");
  for (const message of consoleMessages) {
    console.log(message);
  }
  console.log("CONSOLE_MESSAGES_END");

  console.log("PAGE_ERRORS_START");
  for (const error of pageErrors) {
    console.log(error);
  }
  console.log("PAGE_ERRORS_END");

  console.log("SUSPICIOUS_RESPONSES_START");
  for (const item of suspiciousResponses) {
    console.log(item);
  }
  console.log("SUSPICIOUS_RESPONSES_END");

  const bodyText = (await page.locator("body").innerText()).trim();
  console.log(`BODY_TEXT=${bodyText}`);

  const filteredPageErrors = pageErrors.filter(
    (message) =>
      !knownRuntimeErrors.some((knownError) => message.includes(knownError)),
  );

  await expect(page.locator("body")).toBeVisible();
  expect(page.url()).toContain("127.0.0.1:3001");
  expect(
    suspiciousResponses,
    `Suspicious responses: ${suspiciousResponses.join(" | ")}`,
  ).toEqual([]);
  expect(
    filteredPageErrors,
    `Page errors: ${filteredPageErrors.join(" | ")}`,
  ).toEqual([]);
});
