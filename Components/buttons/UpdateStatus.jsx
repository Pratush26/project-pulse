"use client"

import { updateProjectStatus } from "@/app/actions/Project";
import { useState } from "react";
import { toast } from "react-toastify";

const statusOrder = ["", "pending", "on-track", "at-risk", "critical", "completed"];

export default function UpdateStatusBtn({ projectId, status }) {
    const [desiredStatus, setDesiredStatus] = useState("")
    const handleClick = async () => {
        if (!desiredStatus || desiredStatus === status) {
            toast.info("Please select a new status first");
            return;
        }
        toast.promise(
            (async () => {
                const res = await updateProjectStatus({ projectId, status: desiredStatus })
                console.log(res.message)
                if (!res.success) throw new Error(res.message)

                return res
            })(),
            {
                pending: "Updating project status...",
                success: { render: ({ data }) => data.message || "Successfully updated" },
                error: { render: ({ data, error }) => data?.message || error?.message || "Failed to update" },
            }
        )
    }
    return (
        <>
            <td className="hidden sm:table-cell">
                <select className="bg-(--primary) px-4 py-2" onChange={val => setDesiredStatus(val.target.value)} defaultValue={status} name="issueStatus" id="issueStatus" >
                    {statusOrder.map((s) => (
                        <option
                            key={s}
                            value={s}
                            className="capitalize"
                            disabled={statusOrder.indexOf(s) < statusOrder.indexOf(status)}
                        >
                            {s}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <div className="flex justify-center gap-3 flex-wrap">
                    <button onClick={handleClick} className="btn trns rounded-full btn-primary">Update Status</button>
                </div>
            </td>
        </>
    )
}