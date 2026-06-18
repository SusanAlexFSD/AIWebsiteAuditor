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
        waitUntil: "networkidle",
        timeout: 15000,
      });

      await page.waitForTimeout(2000);
    } catch (error) {
      console.error("CRAWLER ERROR:", error);

      return {
        error: "Unable to access website",
        details: String(error),
      };
    }

    // Generate unique screenshot name
    const screenshotName = `audit-${Date.now()}.png`;

    await page.screenshot({
      path: `./public/${screenshotName}`,
      fullPage: true,
    });

    const title = await page.title();

    const pageUrl = page.url();

    const metaDescription = await page.evaluate(() => {
      const meta = document.querySelector(
        'meta[name="description"]'
      );

      return meta?.getAttribute("content") ?? null;
    });

    const links = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("a")
      ).filter(
        (link) =>
          link.href &&
          link.href.trim() !== "" &&
          !link.href.startsWith("javascript:")
      ).length;
    });

    const images = await page.locator("img").count();

    const h1Count =
      await page.locator("h1:visible").count();

    const h2Count =
      await page.locator("h2:visible").count();

    console.log("Title:", title);
    console.log("Meta:", metaDescription);
    console.log("Links:", links);
    console.log("Images:", images);
    console.log("H1:", h1Count);
    console.log("H2:", h2Count);

    return {
      title,
      pageUrl,
      metaDescription,
      links,
      images,
      h1Count,
      h2Count,
      screenshot: `/${screenshotName}`,
    };
  } finally {
    await browser.close();
  }
}