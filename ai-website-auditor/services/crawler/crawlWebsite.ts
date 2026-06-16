import { chromium } from "playwright";

export async function crawlWebsite(url: string) {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
    });

    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
    } catch (error) {
      return {
        error: "Unable to access website",
        details: String(error),
      };
    }

    const title = await page.title();

    const pageUrl = page.url();

    const metaDescription = await page.evaluate(() => {
      const meta = document.querySelector(
        'meta[name="description"]'
      );

      return meta?.getAttribute("content") ?? null;
    });

    const links = await page.locator("a").count();

    const images = await page.locator("img").count();

    const h1Count = await page.locator("h1").count();

    const h2Count = await page.locator("h2").count();

    return {
      title,
      pageUrl,
      metaDescription,
      links,
      images,
      h1Count,
      h2Count,
    };
  } finally {
    await browser.close();
  }
}