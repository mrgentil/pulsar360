
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
