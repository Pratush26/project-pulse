"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({children, href}) {
    const path = usePathname()
    return (
        <Link href={href} className={`${path === href? "underline underline-offset-4" : "hover:text-gray-500"} trns`}>{children}</Link>
    )
}