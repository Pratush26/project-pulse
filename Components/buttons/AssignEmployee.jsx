"use client"
import { useContext } from "react"
import { AssignModalContext } from "@/Contexts/Context"

export default function AssignEmployeeBtn({ projectId, projectTitle }) {
    const { setCurrentProject, setModalOpened } = useContext(AssignModalContext)
    const handleClick = () => {
        setModalOpened({ opened: true, type: "employees" })
        setCurrentProject({ _id: projectId, title: projectTitle })
    }
    return (
        <button onClick={handleClick} className="btn trns rounded-full btn-primary">Assign Employee</button>
    )
}