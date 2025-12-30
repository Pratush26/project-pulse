"use server"
import { requireRole } from "@/lib/authorize";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function createProject(data) {
    try {
        const creater = await requireRole(["admin"])
        const db = await connectDB();
        const Projects = db.collection("projects");

        const result = await Projects.insertOne({
            title: data.title,
            description: data.description,
            type: data.type,
            endDate: data.endDate,
            client: null,
            employees: [],
            status: "pending",
            createdBy: new ObjectId(creater?._id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        if (!result.acknowledged) return { success: false, message: "Failed to create project" };

        return { success: true, message: "Successfully created project" };

    } catch (err) {
        console.error("Project creation error: ", err);
        return { success: false, message: "Something went wrong!" }
    }
}

export async function getProjects() {
    try {
        const creater = await requireRole(["admin"])
        const db = await connectDB();
        const Projects = db.collection("projects");

        const res = await Projects.find().sort({ createdAt: -1 }).toArray();
        const result = res.map(project => ({
            ...project,
            _id: project._id.toString(),
            createdAt: project.createdAt?.toString(),
            updatedAt: project.updatedAt?.toString(),
            client: project.client?.toString() || null,
            employees: project.employees?.map(e => e.toString()) || []
        }));
        return result;

    } catch (err) {
        console.error("Project creation error: ", err);
        return []
    }
}

export async function assignProject(data) {
    try {
        const creater = await requireRole(["admin"])
        const db = await connectDB();
        const Projects = db.collection("projects");
        const assignedTo = new ObjectId(data.to)
        const user = await db.collection("users").findOne({ _id: assignedTo }, { projection: { role: 1 } });
        let result = null;
        if (user?.role === "client") {
            result = await Projects.updateOne({
                _id: new ObjectId(data.projectId),
                $or: [
                    { client: null },
                    { client: { $exists: false } }
                ]
            },
                {
                    $set: { client: assignedTo }
                }
            )
        }
        else if (user?.role === "employee") {
            result = await Projects.updateOne({ _id: new ObjectId(data.projectId) }, {
                $addToSet: { employees: new ObjectId(assignedTo) }
            })
        }
        console.log(user)
        if (!result?.modifiedCount) return { success: false, message: "Failed to assigned" }
        revalidateTag("projects")
        revalidateTag("users")
        return { success: true, message: "Successfully assigned" }
    } catch (err) {
        console.error("Project assigned error: ", err);
        return { success: false, message: "Internal Server Error" }
    }
}