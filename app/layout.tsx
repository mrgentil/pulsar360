import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ToasterProvider from "@/components/toaster-provider";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pulsar360 - Marketing Digital Studio",
  description:
    "Plateforme SaaS de marketing digital pour optimiser vos campagnes sur les reseaux sociaux",
  keywords: [
    "marketing digital",
    "reseaux sociaux",
    "automation",
    "analytics",
    "content management",
  ],
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
    <html 
      lang="fr" 
      className={inter.variable}
      data-sidebar-size="lg"
      data-bs-theme="light"
      data-layout-width="fluid"
      data-layout-position="fixed"
      data-layout-style="default"
      data-topbar="light"
      suppressHydrationWarning={true}
    >
      <head>
        <link rel="stylesheet" href="/css/icofont.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/style.css" />
          <link
              href="/assets/libs/jsvectormap/css/jsvectormap.min.css"
              rel="stylesheet"
              type="text/css"
          />
          <link
              href="/assets/libs/swiper/swiper-bundle.min.css"
              rel="stylesheet"
              type="text/css"
          />
          <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
          <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
          <link href="/assets/css/app.min.css" rel="stylesheet" type="text/css" />
          <link href="/assets/css/custom.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body 
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <div className="page_wrapper">
          <div id="preloader"></div>
          {/* Header du site gere dans app/(site)/layout.tsx pour eviter les doublons */}
          {children}
          <ToasterProvider />
        </div>
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/aos.js" strategy="lazyOnload" />
        <Script src="/js/main.js" strategy="lazyOnload" />
        <Script src="/assets/js/layout.js" strategy="beforeInteractive" />
        <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/libs/simplebar/simplebar.min.js" strategy="afterInteractive" />
        <Script src="/assets/libs/node-waves/waves.min.js" strategy="afterInteractive" />
        <Script src="/assets/libs/feather-icons/feather.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/pages/plugins/lord-icon-2.1.0.js" strategy="lazyOnload" />
        <Script src="/assets/js/plugins.js" strategy="afterInteractive" />
        <Script src="/assets/libs/apexcharts/apexcharts.min.js" strategy="lazyOnload" />
        <Script src="/assets/libs/jsvectormap/js/jsvectormap.min.js" strategy="lazyOnload" />
        <Script src="/assets/libs/jsvectormap/maps/world-merc.js" strategy="lazyOnload" />
        <Script src="/assets/libs/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/pages/dashboard-ecommerce.init.js" strategy="lazyOnload" />
        <Script src="/assets/js/app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}