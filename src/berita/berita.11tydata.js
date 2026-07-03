export default {
  layout: "layouts/post.njk",
  pageKey: "news",
  eleventyComputed: {
    dirAttr: (data) => (data.lang === "ar" ? "rtl" : "ltr"),
    base: (data) => {
      const found = data.site.languages.find((l) => l.code === data.lang);
      return found ? found.base : "/";
    },
    permalink: (data) => {
      const base = data.site.languages.find((l) => l.code === data.lang)?.base || "/";
      return `${base}${data.slugs.news}/${data.page.fileSlug}/index.html`;
    },
    paths: (data) => {
      const out = {};
      for (const l of data.site.languages) out[l.code] = l.base + data.slugs.news + "/";
      return out;
    },
  },
};
