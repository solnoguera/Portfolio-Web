import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, "mobile only"));

  test("opens as a modal dialog, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.focus();
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    // Opened with showModal(): the browser makes the rest of the page inert.
    expect(await dialog.evaluate((el) => el.matches(":modal"))).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });

  test("navigating to a section closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await dialog.getByRole("link", { name: "Skills" }).click();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.getByRole("heading", { name: /Skills/ })).toBeInViewport();
  });

  test("keeps keyboard focus inside the open menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => !!document.activeElement?.closest("dialog"));
      // Chromium may move focus to the browser UI after the last element; it never lands on the page behind.
      const onPage = await page.evaluate(
        () => document.activeElement !== document.body && !document.activeElement?.closest("dialog"),
      );
      expect(onPage, `tab ${i + 1} escaped the dialog`).toBe(false);
      if (!inside) break;
    }
    await expect(dialog).toBeVisible();
  });
});
