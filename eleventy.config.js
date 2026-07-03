export default function (eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  // Collections: berita per bahasa
  ["ms", "en", "ar"].forEach((lang) => {
    eleventyConfig.addCollection(`berita_${lang}`, (api) =>
      api.getFilteredByGlob(`src/berita/${lang}/*.md`).sort((a, b) => b.date - a.date)
    );
  });

  eleventyConfig.addCollection("galeri", (api) =>
    api.getFilteredByGlob("src/galeri/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByGlob("src/events/*.md").sort((a, b) => {
      return new Date(a.data.eventDate) - new Date(b.data.eventDate);
    })
  );

  // Filters
  eleventyConfig.addFilter("dateDisplay", (dateObj, lang = "ms") => {
    const locales = { ms: "ms-MY", en: "en-GB", ar: "ar-SA" };
    return new Date(dateObj).toLocaleDateString(locales[lang] || "ms-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("dateDay", (dateObj) => new Date(dateObj).getDate());

  eleventyConfig.addFilter("dateMon", (dateObj, lang = "ms") => {
    const locales = { ms: "ms-MY", en: "en-GB", ar: "ar-SA" };
    return new Date(dateObj).toLocaleDateString(locales[lang] || "ms-MY", { month: "short" });
  });

  eleventyConfig.addFilter("upcoming", (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((e) => new Date(e.data.eventDate) >= today);
  });

  eleventyConfig.addFilter("past", (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((e) => new Date(e.data.eventDate) < today).reverse();
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
