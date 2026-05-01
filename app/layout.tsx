import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/site-header";

export const metadata: Metadata = {
  title: "Meet Yusra",
  description: "Meet Yusra - Art and decor consultant portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full max-w-[1928px] mx-auto bg-white text-black">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
