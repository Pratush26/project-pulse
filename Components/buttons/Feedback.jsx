"use client"
import { FeedbackModalContext } from "@/Contexts/Context"
import { useContext } from "react"

export default function FeedbackModalBtn({ projectId, projectTitle }) {
    const { setCurrentProject, setModalOpened } = useContext(FeedbackModalContext)
    const handleClick = () => {
        setModalOpened(true)
        setCurrentProject({ _id: projectId, title: projectTitle })
    }
    return (
        <button onClick={handleClick} className="btn trns rounded-full btn-primary">Feedback</button>
    )
}