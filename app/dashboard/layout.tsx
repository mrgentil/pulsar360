import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ToasterProvider from "@/components/toaster-provider";
import TopBar from "@/components/dashboard/TopBar";
import Footer from "@/components/dashboard/Footer";
import SideBar from "@/components/dashboard/SideBar";
import React from "react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Pulsar360 - Dashboard",
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
        <body>
        <div id="layout-wrapper">
            <TopBar/>
            <SideBar/>
            {/* Header du site géré dans app/(site)/layout.tsx pour éviter les doublons */}
            {children}
            <ToasterProvider />
            <Footer/>
        </div>
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
