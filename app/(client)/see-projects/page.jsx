import { getProjects } from "@/app/actions/Project"

export const dynamic = "force-dynamic"

export default async function SeeProjects() {
    const data = await getProjects({client: "client"})
    return (
        <main>

        </main>
    )
}