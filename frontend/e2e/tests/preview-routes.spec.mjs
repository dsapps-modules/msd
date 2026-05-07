import { test, expect } from "@playwright/test";

const previewRoutes = [
  "/previewCatalog",
  "/addDeliveryAddress?title=Casa&address=Rua+Preview&contactNumber=11999999999",
  "/supportTicketAdd?title=Preview+Ticket&subject=Assunto+de+demo",
  "/checkoutScreens?product_ids=1,2",
  "/storeDetailScreen?slug=preview-store",
  "/storeDetailWeb?slug=preview-store",
  "/trackOrderScreen?order_id=PREVIEW-001&order_status=processing&store_lat=-23.5505&store_long=-46.6333",
  "/profileEdite?first_name=Preview&last_name=User&phone=%2B5511999999999&country_code=BR&birthday=1995-01-01",
  "/productDisplay?slug=preview-product",
  "/desktopProductDisplay?slug=preview-product",
  "/depositScreen?wallet_id=1&max_deposit_amount=500.00",
  "/setPasswordScreen?email=preview%40example.com&token=123456",
];
const knownFrameworkErrors = [
  "BindingError: Expected null or instance of Typeface, got an instance of Typeface",
];

for (const route of previewRoutes) {
  test(`preview smoke: ${route}`, async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(route, { waitUntil: "domcontentloaded" });
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
