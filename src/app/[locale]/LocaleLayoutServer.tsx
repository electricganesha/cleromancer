import { Navbar } from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { auth } from "@/lib/auth";
import { Footer } from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

export default async function LocaleLayoutServer({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const session = await auth();
  const messages = await getMessages({ locale });

  return (
    <>
      <AuthProvider session={session}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="content">{children}</div>
        </NextIntlClientProvider>
      </AuthProvider>
      <Footer />
      <Analytics />
      <GoogleAnalytics gaId="G-KZVN0K26Z6" />
    </>
  );
}
