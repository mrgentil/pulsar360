
import Footer from "@/components/dashboard/Footer"
import type { ReactNode } from "react"
import TopBarSimple from "@/components/dashboard/TopBarSimple"
import SideBar from "@/components/dashboard/SideBar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div id="layout-wrapper">
            <TopBarSimple />
            <SideBar />
            {children}
            <Footer />
        </div>
    )
}
