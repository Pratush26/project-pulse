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
            <section className="grid grid-cols-1 md:grid-cols-3 place-content-center gap-4">
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span className="text-xl font-semibold">Created</span>
                    </div>
                    <h5 className="text-sm my-2">{new Date(data?.createdAt).toLocaleString()}</h5>
                </span>
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span className="text-xl font-semibold">Deadline</span>
                    </div>
                    <h5 className="text-sm my-2">{new Date(data?.endDate).toLocaleString()}</h5>
                    {
                        true ?
                            <p className="text-xs font-medium text-gray-500">{ } days ramaining</p>
                            :
                            <p className="text-xs font-medium text-rose-500">{ } days late</p>
                    }
                </span>
                <span className="p-5 rounded-lg bg-(--base-200) w-full">
                    <div>
                        <span></span>
                        <span className="text-xl font-semibold">Team Size</span>
                    </div>
                    <h5 className="text-sm my-2">{data?.clientInfo ? (data?.employeesInfo?.length + 2) : (data?.employeesInfo?.length + 1)} members</h5>
                    <p className="text-xs font-medium text-gray-500">Including client, admin and employees</p>
                </span>
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) w-full">
                <h3 className="text-lg font-semibold m-2">Activity Timeline</h3>
                {
                    data?.timeline?.map((e, i) => (
                        <div key={i} className="p-5 rounded-lg bg-(--base-300) w-full">
                            <p>{e.title}</p>
                            <p className="text-sm">{e.description}</p>
                        </div>
                    ))
                }
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4 className="text-lg font-semibold m-2">Project Admin</h4>
                <div className="flex items-center gap-3 p-5 rounded-lg bg-(--base-300) w-full">
                    {
                        data?.createrInfo ?
                            <>
                                <Image src={data?.createrInfo?.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                                <div>
                                    <p>{data?.createrInfo?.name}</p>
                                    <p className="text-xs text-gray-500">{data?.createrInfo?.email}</p>
                                </div>
                            </>
                            :
                            <p className="text-sm text-gray-500">Project Admin Not Found!</p>
                    }
                </div>
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4 className="text-lg font-semibold m-2">Project Client</h4>
                <div className="flex items-center gap-3 p-5 rounded-lg bg-(--base-300) w-full">
                    {
                        data?.clientInfo ?
                            <>
                                <Image src={data?.clientInfo?.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                                <div>
                                    <p>{data?.clientInfo?.name}</p>
                                    <p className="text-xs text-gray-500">{data?.clientInfo?.email}</p>
                                </div>
                            </>
                            :
                            <p className="text-sm text-gray-500">Project client not assigned yet!</p>
                    }
                </div>
            </section>
            <section className="p-5 rounded-lg bg-(--base-200) my-5">
                <h4 className="text-lg font-semibold m-2">Project Employees</h4>
                {
                    data?.employeesInfo?.length > 0 ?
                        data?.employeesInfo?.map((e, i) => (
                            <div key={i} className="flex items-center gap-3 p-5 rounded-lg bg-(--base-300) w-full">
                                <Image src={e.photo} width={40} height={40} alt="admin image" style={{ objectFit: "cover" }} className="aspect-square rounded-full" />
                                <div>
                                    <p>{e.name}</p>
                                    <p className="text-xs text-gray-500">{e.email}</p>
                                </div>
                            </div>
                        ))
                        :
                        <p className="text-sm text-gray-500">Project employees not assigned yet!</p>
                }
            </section>
        </main>
    )
}