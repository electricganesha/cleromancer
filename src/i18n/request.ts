import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import en from "../../messages/en.json";
import pt from "../../messages/pt.json";

const messagesMap = { en, pt };

export default getRequestConfig(async ({ requestLocale }) => {
  // Await requestLocale if it's a promise
  const resolvedLocale =
    typeof requestLocale === "object" &&
    typeof requestLocale.then === "function"
      ? await requestLocale
      : requestLocale;

  const locale = hasLocale(routing.locales, resolvedLocale)
    ? resolvedLocale
    : routing.defaultLocale;

  const messages = messagesMap[locale.toString() as keyof typeof messagesMap];

  return {
    locale,
    messages,
  };
});
