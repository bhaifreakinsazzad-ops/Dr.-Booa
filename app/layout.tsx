import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/site-header";

function getMetadataBase() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://meet-yusra.vercel.app");
  } catch {
    return new URL("https://meet-yusra.vercel.app");
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "Meet Yusra",
    template: "%s | Meet Yusra",
  },
  description: "Meet Yusra - Art and decor consultant portfolio",
  openGraph: {
    title: "Meet Yusra",
    description: "Art and decor consultant portfolio",
    type: "website",
    siteName: "Meet Yusra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Yusra",
    description: "Art and decor consultant portfolio",
  },
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
