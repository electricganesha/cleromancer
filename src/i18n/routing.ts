import { defineRouting } from "next-intl/routing";

export const locales = ["en", "pt"];
export const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
});
