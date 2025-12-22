import Link from "next/link";
import NavLink from "../NavLink";
import Image from "next/image";

export default async function Navbar() {
    const session = null
    return (
        <section className="bg-(--base-200) text-white w-full">
            <nav className="flex items-center justify-between w-11/12 mx-auto py-4 text-sm font-medium">
                <Link href="/" className="flex gap-2 items-center">
                    <Image src={"/project-plus.svg"} height={40} width={40} style={{ objectFit: "contain" }} alt="Logo" className="" />
                    <h5 className="text-2xl font-semibold">Project Pulse</h5>
                </Link>
                <div className="space-x-2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/all-products">All Products</NavLink>
                </div>
                {
                    session?.user?
                        <div className="flex items-center gap-2">
                            <Image src={session?.user?.image} height={40} width={40} style={{ objectFit: "cover" }} alt="user image" className="rounded-full aspect-square" />
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <button className="btn btn-primary trns rounded-md">Log Out</button>
                            </form>
                        </div>
                        :
                        <div className="space-x-2">
                            <NavLink href="/register">Register</NavLink>
                            <NavLink href="/login">Login</NavLink>
                        </div>
                }
            </nav>
        </section>
    )
}