console.log("Running next-intl middleware");
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!_next|favicon.ico|logo.png|logo|api|.*\\..*).*)"],
};
