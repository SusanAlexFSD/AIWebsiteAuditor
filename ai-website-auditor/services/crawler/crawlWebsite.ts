import { chromium } from "playwright";

export async function crawlWebsite(url: string) {
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
    });

    try {
      await page.goto(url, {
        waitUntil: "load",
        timeout: 30000,
      });

      await page.waitForTimeout(2000);
    } catch (error) {
      console.error("PAGE LOAD ERROR:", error);

      return {
        error: "Unable to access website",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      };
    }

    const title = await page.title();
    const pageUrl = page.url();

    const metaDescription = await page.evaluate(() => {
      return (
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ?? null
      );
    });

    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a")).filter(
        (link) =>
          link.href &&
          link.href.trim() !== "" &&
          !link.href.startsWith("javascript:")
      ).length;
    });

    const images = await page.locator("img").count();

    const missingAltTags = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("img")).filter(
        (img) => {
          const alt = img.getAttribute("alt");
          return !alt || alt.trim() === "";
        }
      ).length;
    });

    const h1Count = await page.locator("h1:visible").count();
    const h2Count = await page.locator("h2:visible").count();

    const hasCanonical = await page.evaluate(() =>
      !!document.querySelector('link[rel="canonical"]')
    );

    const hasOgTitle = await page.evaluate(() =>
      !!document.querySelector('meta[property="og:title"]')
    );

    const hasOgDescription = await page.evaluate(() =>
      !!document.querySelector(
        'meta[property="og:description"]'
      )
    );

    const hasOgImage = await page.evaluate(() =>
      !!document.querySelector('meta[property="og:image"]')
    );

    const hasViewport = await page.evaluate(() =>
      !!document.querySelector('meta[name="viewport"]')
    );

    const hasSchema = await page.evaluate(() =>
      !!document.querySelector(
        'script[type="application/ld+json"]'
      )
    );

    const usesHttps = pageUrl.startsWith("https://");

    let hasRobots = false;

    try {
      const response = await page.request.get(
        new URL("/robots.txt", pageUrl).href
      );

      hasRobots = response.ok();
    } catch {
      hasRobots = false;
    }

    let hasSitemap = false;

    try {
      const response = await page.request.get(
        new URL("/sitemap.xml", pageUrl).href
      );

      hasSitemap = response.ok();
    } catch {
      hasSitemap = false;
    }

    // Screenshots are disabled on Vercel because the filesystem is read-only.
    // Replace this later with Cloudinary, Vercel Blob, or S3.
    const screenshot = null;

    return {
      title,
      pageUrl,
      metaDescription,

      links,
      images,
      missingAltTags,

      h1Count,
      h2Count,

      hasCanonical,
      hasOgTitle,
      hasOgDescription,
      hasOgImage,

      hasViewport,
      hasSchema,
      usesHttps,
      hasRobots,
      hasSitemap,

      screenshot,
    };
  } catch (error) {
    console.error("CRAWLER ERROR:");

    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }

    return {
      error: "Crawler failed",
      details:
        error instanceof Error
          ? error.message
          : String(error),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}