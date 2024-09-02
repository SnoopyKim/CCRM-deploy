import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCRM",
  description: "보험상담솔루션 CCRM",
};

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kr"
      className={`${pretendard.variable} font-pretendard text-main-1 text-base font-light`}
    >
      <body>{children}</body>
    </html>
  );
}
