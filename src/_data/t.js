import { readFileSync } from "node:fs";

const load = (l) =>
  JSON.parse(readFileSync(new URL(`./i18n/${l}.json`, import.meta.url), "utf8"));

export default {
  ms: load("ms"),
  en: load("en"),
  ar: load("ar"),
};
