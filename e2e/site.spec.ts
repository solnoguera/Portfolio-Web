import { expect, test } from "@playwright/test";

test("renders the senior profile with correct metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Sol Noguera · Senior Full Stack Engineer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Senior Full Stack Engineer");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
});

test("only links to Sol's own profiles", async ({ page }) => {
  await page.goto("/");
  const html = await page.content();
  expect(html).not.toMatch(/maximiliano|cidron/i);
  await expect(page.locator('a[href="https://github.com/solnoguera"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://www.linkedin.com/in/solnoguera"]').first()).toBeAttached();
});

test("resume link points to the bundled PDF", async ({ page, request }) => {
  await page.goto("/");
  const href = await page.getByRole("link", { name: /Download CV/ }).getAttribute("href");
  expect(href).toBe("/Sol_Noguera_CV.pdf");
  const res = await request.get(href!);
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("pdf");
});

test("theme toggle switches theme and persists across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");

  const toggle = page.getByRole("button", { name: "Dark theme" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("follows the OS color scheme on first visit", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("contact form shows accessible validation errors", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message" }).click();
  const name = page.getByLabel("Name");
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toHaveAccessibleDescription("Please enter your name.");
});

test("contact form reports success without leaving the page", async ({ page }) => {
  await page.route("https://getform.io/**", (route) => route.fulfill({ status: 200, json: { success: true } }));
  await page.goto("/#contact");
  await page.getByLabel("Name").fill("Recruiter");
  await page.getByLabel("Email").fill("recruiter@company.com");
  await page.getByLabel("Message").fill("We'd love to talk about a senior role.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("Thanks!");
  await expect(page).toHaveURL(/#contact$/);
});

test("contact form offers email fallback on failure", async ({ page }) => {
  await page.route("https://getform.io/**", (route) => route.fulfill({ status: 500 }));
  await page.goto("/#contact");
  await page.getByLabel("Name").fill("Recruiter");
  await page.getByLabel("Email").fill("recruiter@company.com");
  await page.getByLabel("Message").fill("We'd love to talk about a senior role.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("noguerasol22@gmail.com");
});
