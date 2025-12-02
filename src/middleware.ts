console.log("Running next-intl middleware");
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/routing";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Always use a locale prefix
  localePrefix: "always",
});

export const config = {
  matcher: ["/(en|pt)/:path*"],
};
