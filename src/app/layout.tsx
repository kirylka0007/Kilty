import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} — Live Social Deduction Nights`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description:
    "Live Mafia & Traitors-style social deduction events in Edinburgh and Glasgow. Bluff, deduce, and have a brilliant night out.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: `${siteConfig.siteName} — Live Social Deduction Nights`,
    description:
      "Live Mafia & Traitors-style social deduction events in Edinburgh and Glasgow.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} — Live Social Deduction Nights`,
    description:
      "Live Mafia & Traitors-style social deduction events in Edinburgh and Glasgow.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen min-w-0 overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
