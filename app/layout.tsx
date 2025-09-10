import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pulsar360 - Marketing Digital Studio",
  description: "Plateforme SaaS de marketing digital pour optimiser vos campagnes sur les réseaux sociaux",
  keywords: ["marketing digital", "réseaux sociaux", "automation", "analytics", "content management"],
  authors: [{ name: "Pulsar360 Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="/css/icofont.min.css"/>
        <link rel="stylesheet" href="/css/owl.carousel.min.css"/>
        <link rel="stylesheet" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/css/aos.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
      </head>
      <body className="font-sans antialiased">
      <div className="page_wrapper">
          <div id="preloader">
              <div id="loader"></div>
          </div>
        {children}
      </div>
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/aos.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
