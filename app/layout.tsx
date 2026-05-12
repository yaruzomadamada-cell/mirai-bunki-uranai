import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "未来分岐占い｜今の選択で変わる3つの未来を無料診断",
    template: "%s｜未来分岐占い",
  },
  description:
    "恋愛、復縁、仕事、人生の迷いに。生年月日と今の悩みから「このまま進む未来」「動いた未来」「手放した未来」を無料で占います。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "未来分岐占い｜今の選択で変わる3つの未来を無料診断",
    description:
      "恋愛、復縁、仕事、人生の迷いに。生年月日と今の悩みから3つの未来分岐を無料で占います。",
    url: siteUrl,
    siteName: "未来分岐占い",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "未来分岐占い" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "未来分岐占い",
    description: "このまま進む未来。動いた未来。手放した未来。",
    images: ["/og-image.svg"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "未来分岐占い",
  url: siteUrl,
  description:
    "恋愛、復縁、仕事、人生の迷いに。生年月日と今の悩みから3つの未来分岐を無料で占います。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
