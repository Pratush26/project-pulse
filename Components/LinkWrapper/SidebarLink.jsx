"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({children, href}) {
    const path = usePathname()
    return (
        <Link href={href} className={`${path === "/register"? "bg-gray-500" : "hover:bg-gray-600"} trns px-6 pr-10 py-2 rounded-lg`}>{children}</Link>
    )
}