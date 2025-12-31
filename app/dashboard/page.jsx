import { auth, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
    const session = await auth()
    return (
        <main className="my-10 w-full">
            <section className="flex gap-2 items-center justify-center">
                <Image src={session?.user?.image} height={100} width={100} style={{ objectFit: "cover" }} alt="user image" className="aspect-square rounded-full" />
                <div className="text-xs font-semibold">
                    <p className="text-xl">{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                </div>
            </section>
            <form
                className="mx-auto w-fit"
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button className="btn btn-primary trns rounded-md">Log Out</button>
            </form>
            <section className="flex items-center justify-center gap-2 text-sm font-medium text-(--primary) m-4">
                {
                    session?.user?.role === "admin"
                    &&
                    <>
                        <Link href="/create-project">Create Project</Link>
                        <Link href="/manage-project">Manage Project</Link>
                    </>
                }
            </section>
        </main>
    )
}