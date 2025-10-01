import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, M_PLUS_1p } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const mPlus1p = M_PLUS_1p({
  variable: "--font-m-plus-1p",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Karafu Official Website",
  description:
    "からふ．イラストレーター．ポップで可愛いイラストが得意．お仕事お待ちしております！",
  metadataBase: new URL("https://karafu.jp"),
};

// --- iOSでinputフォーカス時のズームを防ぐ ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className={`${mPlus1p.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
