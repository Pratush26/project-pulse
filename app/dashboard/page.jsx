import { auth, signOut } from "@/auth"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
    const session = await auth()
    return (
        <main className="my-10 w-full">
            <section className="flex gap-2 items-center justify-center">
                <Image src={session?.user?.image} height={100} width={100} style={{ objectFit: "cover" }} alt="user image" className="aspect-square rounded-full" />
                <div className="text-xl font-semibold">
                    <p>{session?.user?.name}</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
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
            <section className="flex items-center justify-center gap-2 m-4">
                <p className="text-sm font-medium bg-(--primary) px-4 py-1 rounded-full">
                {session?.user?.role}
                </p>
            </section>
        </main>
    )
}