"use client"
import { useContext } from "react"
import { AssignModalContext } from "@/Contexts/Context"

export default function AssignClientBtn({ projectId, projectTitle }) {
    const { setModalOpened, setCurrentProject } = useContext(AssignModalContext)
    const handleClick = () => {
        setModalOpened({ opened: true, type: "clients" })
        setCurrentProject({ _id: projectId, title: projectTitle })
    }
    return (
        <button onClick={handleClick} className="btn trns rounded-full btn-out">Assign client</button>
    )
}