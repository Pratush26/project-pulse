"use client"
import { getUsers } from "@/app/actions/User";
import { AssignModalContext } from "@/Contexts/Context";
import { useEffect, useState } from "react";

export default function AssignModalProvider({ children }) {
    const [modalOpened, setModalOpened] = useState({ opened: false, type: "employees" })
    const [clients, setClients] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentProject, setCurrentProject] = useState(null)

    useEffect(() => {
        if (!modalOpened?.opened) return
        const fetchData = async () => {
            setLoading(true)
            try {
                if (modalOpened.type === "clients") {
                    const clientsData = await getUsers({ role: "client" })
                    setClients(clientsData)
                } else {
                    const employeesData = await getUsers({ role: "employee" })
                    setEmployees(employeesData)
                }
            } catch (err) {
                console.error("Failed to fetch users:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [modalOpened])
    
    return (
        <AssignModalContext.Provider value={{ modalOpened, setModalOpened, clients, employees, loading, currentProject, setCurrentProject }}>
            {children}
        </AssignModalContext.Provider>
    )
}