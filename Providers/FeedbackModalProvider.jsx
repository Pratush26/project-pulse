"use client"
import { FeedbackModalContext } from "@/Contexts/Context";
import { useEffect, useState } from "react";

export default function FeedbackModalProvider({ children }) {
    const [modalOpened, setModalOpened] = useState(false)
    const [currentProject, setCurrentProject] = useState(null)
    
    return (
        <FeedbackModalContext.Provider value={{ modalOpened, setModalOpened, currentProject, setCurrentProject }}>
            {children}
        </FeedbackModalContext.Provider>
    )
}