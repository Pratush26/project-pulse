"use client"
import { RxCross2 } from "react-icons/rx";
import Loader from "../Loader";
import { useContext } from "react";
import { AssignModalContext } from "@/Contexts/Context";
import { toast } from "react-toastify";
import { assignProject } from "@/app/actions/Project";

export default function AssignEmployeeModal() {
    const { modalOpened, setModalOpened, employees, loading, currentProject } = useContext(AssignModalContext)
    if (!modalOpened.opened || modalOpened.type === "clients") return null
    const handleClick = async (id) => {
        const res = await assignProject({ to: id, projectId: currentProject._id })
        if (res.success) toast.success(res.message || "Successfully Assigned")
        else toast.error(res.message || "Proccess failed!")
    }
    return (
        <section className="fixed bg-foreground text-background z-90 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 p-6 shadow-md/40 rounded-2xl w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="w-full flex items-center justify-between gap-2">
                <span>
                    <h4 className="font-semibold">Choose Employees</h4>
                    <p>{currentProject.title}</p>
                </span>
                <button onClick={() => setModalOpened({ opened: false, type: "employees" })} type="button" className="cursor-pointer">
                    <RxCross2 />
                </button>
            </div>
            {
                loading ?
                    <Loader />
                    :
                    employees?.map((e, i) => (
                        <button key={i} onClick={() => handleClick(e._id)} className="btn bg-gray-400 hover:bg-gray-500 trns w-full rounded-full flex justify-between">
                            <p>{e.name}</p>
                            <p>{e.projectsCount}</p>
                        </button>
                    ))
            }
        </section>
    )
}