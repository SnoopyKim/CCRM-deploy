import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import DialogManager from "./_utils/dialog/manager";
import AuthHydration from "./_utils/auth/hydration";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="kr"
      className={`${pretendard.variable} font-pretendard text-main-1 text-sm 2xl:text-base font-light`}
    >
      <body className="w-screen min-h-screen">
        <AuthHydration>{children}</AuthHydration>
        {modal}
        <DialogManager />
      </body>
    </html>
  );
}
