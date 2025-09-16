import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ToasterProvider from "@/components/toaster-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pulsar360 - Marketing Digital Studio",
  description:
    "Plateforme SaaS de marketing digital pour optimiser vos campagnes sur les réseaux sociaux",
  keywords: [
    "marketing digital",
    "réseaux sociaux",
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
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="/css/icofont.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/style.css" />
          <Script src="/assets/js/layout.js"></Script>
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
      <body className="font-sans antialiased">
        <div className="page_wrapper">
          <div id="preloader">

          </div>
          {/* Header du site géré dans app/(site)/layout.tsx pour éviter les doublons */}
          {children}
          <ToasterProvider />
        </div>
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/aos.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
        <Script src="/assets/libs/simplebar/simplebar.min.js"></Script>
        <Script src="/assets/libs/node-waves/waves.min.js"></Script>
        <Script src="/assets/libs/feather-icons/feather.min.js"></Script>
        <Script src="/assets/js/pages/plugins/lord-icon-2.1.0.js"></Script>
        <Script src="/assets/js/plugins.js"></Script>
        <Script src="/assets/libs/apexcharts/apexcharts.min.js"></Script>
        <Script src="/assets/libs/jsvectormap/js/jsvectormap.min.js"></Script>
        <Script src="/assets/libs/jsvectormap/maps/world-merc.js"></Script>
        <Script src="/assets/libs/swiper/swiper-bundle.min.js"></Script>
        <Script src="/assets/js/pages/dashboard-ecommerce.init.js"></Script>
        <Script src="/assets/js/app.js"></Script>
      </body>
    </html>
  );
}
