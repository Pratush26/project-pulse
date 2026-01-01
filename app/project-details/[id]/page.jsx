import { getProjectDetails } from "@/app/actions/Project"
import Image from "next/image"

export default async function ProjectDetails({ params }) {
    const { id } = await params
    const data = await getProjectDetails({ _id: id })
    console.log(data)
    return (
        <main className="w-11/12 mx-auto space-y-2 my-10">
            <h1 className="text-3xl font-semibold">{data?.title}</h1>
            <p>{data?.description}</p>
            <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-(--primary) my-4 w-fit">{data?.type}</div>
            <section className="grid grid-cols-3 place-content-center gap-4">
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span>Created</span>
                    </div>
                    <h5>{new Date(data?.createdAt).toLocaleString()}</h5>
                </span>
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span>Deadline</span>
                    </div>
                    <h5>{new Date(data?.endDate).toLocaleString()}</h5>
                    {
                        true ?
                            <p>{ } days ramaining</p>
                            :
                            <p>{ } days late</p>
                    }
                </span>
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span>Team Size</span>
                    </div>
                    <h5>{data?.employeesInfo?.length + 2} members</h5>
                    <p>Including client, admin and employees</p>
                </span>
            </section>
            <section>
                <h3>Activity Timeline</h3>
                {
                    data?.timeling?.map((e, i) => (
                        <div key={i}>
                            <p>{e.title}</p>
                            <p>{e.description}</p>
                        </div>
                    ))
                }
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4>Project Admin</h4>
                <div className="flex items-center gap-3">
                    <Image src={data?.createrInfo?.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                    <div>
                        <p>{data?.createrInfo?.name}</p>
                        <p className="text-xs text-gray-500">{data?.createrInfo?.email}</p>
                    </div>
                </div>
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4>Project Client</h4>
                <div className="flex items-center gap-3">
                    <Image src={data?.clientInfo?.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                    <div>
                        <p>{data?.clientInfo?.name}</p>
                        <p className="text-xs text-gray-500">{data?.clientInfo?.email}</p>
                    </div>
                </div>
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4>Project Employees</h4>
                {
                    data?.employeesInfo?.map((e, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Image src={e.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                            <div>
                                <p>{e.name}</p>
                                <p className="text-xs text-gray-500">{e.email}</p>
                            </div>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}