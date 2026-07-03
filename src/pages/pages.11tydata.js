export default {
  layout: "layouts/base.njk",
  pagination: {
    data: "site.languages",
    size: 1,
    alias: "l",
  },
  eleventyComputed: {
    lang: (data) => data.l.code,
    dirAttr: (data) => data.l.dir,
    base: (data) => data.l.base,
    permalink: (data) =>
      data.l.base + (data.pageSlug ? data.pageSlug + "/" : "") + "index.html",
    paths: (data) => {
      const out = {};
      for (const l of data.site.languages) {
        out[l.code] = l.base + (data.pageSlug ? data.pageSlug + "/" : "");
      }
      return out;
    },
    title: (data) =>
      data.tSection ? data.t[data.l.code][data.tSection].title : "",
  },
};
