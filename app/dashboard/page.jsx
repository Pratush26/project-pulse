import { auth, signOut } from "@/auth"
import Image from "next/image"

export default async function Dashboard() {
    const session = await auth()
    return (
        <main className="">
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
        </main>
    )
}