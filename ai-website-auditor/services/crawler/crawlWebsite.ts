import { chromium } from "playwright";
import path from "path";

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
    waitUntil: "load",
    timeout: 30000,
  });

  await page.waitForTimeout(2000);
} catch (error) {

 await page.goto(url, {
  waitUntil: "load",
  timeout: 30000,
});

await page.waitForTimeout(2000);


      console.error("CRAWLER ERROR:", error);

      return {
        error: "Unable to access website",
        details: String(error),
      };
    }

    const title = await page.title();

    const pageUrl = page.url();

    const metaDescription =
      await page.evaluate(() => {
        const meta =
          document.querySelector(
            'meta[name="description"]'
          );

        return (
          meta?.getAttribute("content") ??
          null
        );
      });

    const links = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("a")
      ).filter(
        (link) =>
          link.href &&
          link.href.trim() !== "" &&
          !link.href.startsWith(
            "javascript:"
          )
      ).length;
    });

    const images =
      await page.locator("img").count();

    const missingAltTags =
      await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("img")
        ).filter((img) => {
          const alt =
            img.getAttribute("alt");

          return (
            !alt ||
            alt.trim() === ""
          );
        }).length;
      });

    const h1Count =
      await page
        .locator("h1:visible")
        .count();

    const h2Count =
      await page
        .locator("h2:visible")
        .count();

    const hasCanonical =
      await page.evaluate(() => {
        return !!document.querySelector(
          'link[rel="canonical"]'
        );
      });

    const hasOgTitle =
      await page.evaluate(() => {
        return !!document.querySelector(
          'meta[property="og:title"]'
        );
      });

    const hasOgDescription =
      await page.evaluate(() => {
        return !!document.querySelector(
          'meta[property="og:description"]'
        );
      });

    const hasOgImage =
      await page.evaluate(() => {
        return !!document.querySelector(
          'meta[property="og:image"]'
        );
      });

    const hasViewport =
      await page.evaluate(() => {
        return !!document.querySelector(
          'meta[name="viewport"]'
        );
      });

    const hasSchema =
      await page.evaluate(() => {
        return !!document.querySelector(
          'script[type="application/ld+json"]'
        );
      });

    const usesHttps =
      pageUrl.startsWith(
        "https://"
      );

    let hasRobots = false;

    try {
      const robotsResponse =
        await page.request.get(
          new URL(
            "/robots.txt",
            pageUrl
          ).href
        );

      hasRobots =
        robotsResponse.ok();
    } catch {
      hasRobots = false;
    }

    let hasSitemap = false;

    try {
      const sitemapResponse =
        await page.request.get(
          new URL(
            "/sitemap.xml",
            pageUrl
          ).href
        );

      hasSitemap =
        sitemapResponse.ok();
    } catch {
      hasSitemap = false;
    }

    console.log("Title:", title);
    console.log(
      "Meta:",
      metaDescription
    );
    console.log("Links:", links);
    console.log("Images:", images);
    console.log(
      "Missing ALT Tags:",
      missingAltTags
    );
    console.log("H1:", h1Count);
    console.log("H2:", h2Count);

    console.log(
      "Canonical:",
      hasCanonical
    );

    console.log(
      "Open Graph Title:",
      hasOgTitle
    );

    console.log(
      "Open Graph Description:",
      hasOgDescription
    );

    console.log(
      "Open Graph Image:",
      hasOgImage
    );

    console.log(
      "Viewport:",
      hasViewport
    );

    console.log(
      "Schema:",
      hasSchema
    );

    console.log(
      "HTTPS:",
      usesHttps
    );

    console.log(
      "robots.txt:",
      hasRobots
    );

    console.log(
      "sitemap.xml:",
      hasSitemap
    );

    const fileName = `${Date.now()}.png`;

    const screenshotPath = path.join(
      process.cwd(),
      "public",
      "audits",
      fileName
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

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

      screenshot: `/audits/${fileName}`,
    };
  } finally {
    await browser.close();
  }
}