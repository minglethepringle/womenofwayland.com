import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites root-relative URLs when served from a subpath (e.g. a GitHub Pages project URL).
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/img/logo.png": "favicon.png" });

  // Newest first, matching the original WordPress ordering.
  eleventyConfig.addCollection("episodes", (api) =>
    api.getFilteredByGlob("src/episodes/*.html").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("bySeason", (episodes, season) =>
    episodes.filter((ep) => ep.data.season === season)
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
  };
}
