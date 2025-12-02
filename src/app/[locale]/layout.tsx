// app/[locale]/layout.tsx
import LayoutProps from "next";
import LocaleLayoutServer from "./LocaleLayoutServer";
import { Inter, ZCOOL_XiaoWei } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const zcool = ZCOOL_XiaoWei({
  subsets: ["latin"],
  variable: "--font-zcool",
  weight: ["400"],
});

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={[inter.className, zcool.className].join(" ")}
    >
      <body>
        <LocaleLayoutServer locale={locale}>{children}</LocaleLayoutServer>
      </body>
    </html>
  );
}
