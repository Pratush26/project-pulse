import { getProjects } from "@/app/actions/Project"
import Link from "next/link"
import "@/Utils/styles/table.css"
import AssignClientBtn from "@/Components/buttons/AssignClient"
import AssignEmployeeBtn from "@/Components/buttons/AssignEmployee"
import AssignModalProvider from "@/Providers/AssignModalProvider"
import AssignClientModal from "@/Components/Modals/AssignClientModal"
import AssignEmployeeModal from "@/Components/Modals/AssignEmployeeModal"

export default async function ManageProjects() {
    const data = await getProjects()
    return (
        <AssignModalProvider>
            <main className="w-full">
                <AssignClientModal/>
                <AssignEmployeeModal />
                {
                    data?.length > 0 ?
                        <table className="table-auto text-center text-sm font-medium border-collapse w-full sm:w-11/12 mx-auto overflow-hidden">
                            <caption className='text-4xl font-bold m-8'>All Projects : {data?.length}</caption>
                            <thead>
                                <tr className="bg-(--secondary)">
                                    <th className="hidden sm:table-cell">SL no.</th>
                                    <th>Title</th>
                                    <th className="hidden sm:table-cell">Client</th>
                                    <th>Employees</th>
                                    <th className="hidden sm:table-cell">Starter At</th>
                                    <th className="hidden sm:table-cell">Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {
                                    data?.map((e, i) => (
                                        <tr key={i} className="border border-gray-(--accent) bg-(--base-200) text-foreground">
                                            <td className="hidden sm:table-cell">{i + 1}</td>
                                            <td className="break-all text-xs">
                                                <p className="font-semibold text-sm">{e.title}</p>
                                                <p>{e.senderPhone}</p>
                                            </td>
                                            <td>{e.client ?? 0}</td>
                                            <td>{e.employees?.length}</td>
                                            <td>{new Date(e.createdAt).toDateString()}</td>
                                            <td className="hidden sm:table-cell">
                                                <span className={`${e.status === 'pending' ? "bg-amber-600" : e.status === 'on-track' ? "bg-blue-600" : e.status === 'at-risk' ? "bg-orange-600" : e.status === 'critical' ? 'bg-rose-600' : 'bg-emerald-600'} rounded-full px-4 text-white py-1 text-xs font-semibold`}>
                                                    {e.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-3 flex-wrap">
                                                    {!e?.client && <AssignClientBtn projectId={e._id} projectTitle={e.title} />}
                                                    <AssignEmployeeBtn projectId={e._id} projectTitle={e.title} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className="flex flex-col min-h-[80vh] w-full items-center justify-center gap-3">
                            <p className="text-3xl font-bold text-secondary">No Request Found!</p>
                            <Link to="/" className="bttn trnsition rounded-sm shadow-md/20">Back to Home</Link>
                        </div>
                }
            </main>
        </AssignModalProvider>
    )
}