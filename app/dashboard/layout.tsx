
import Footer from "@/components/dashboard/Footer";
import type { ReactNode } from "react";

import TopBar from "@/components/dashboard/TopBar";
import SideBar from "@/components/dashboard/SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div id="layout-wrapper">
                <TopBar />
                <SideBar/>
                {children}
                <Footer />
            </div>
        </>
    );
}
