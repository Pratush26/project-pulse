import Link from "next/link";
import NavLink from "../LinkWrapper/NavLink";
import Image from "next/image";
import Sidebar from "./sidebar";

export default async function Navbar() {
    return (
        <header className="bg-(--base-200) text-white w-full relative">
            <nav className="flex items-center justify-between w-11/12 mx-auto my-4 text-sm font-medium">
                <Link href="/" className="flex gap-2 items-center">
                    <Image src={"/project-plus.svg"} height={40} width={40} style={{ objectFit: "contain" }} alt="Logo" className="" />
                    <h5 className="text-2xl font-semibold">Project Pulse</h5>
                </Link>
                <div className="space-x-2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/all-products">All Products</NavLink>
                </div>
                <Sidebar />
            </nav>
        </header>
    )
}