import { requireRole } from "@/lib/authorize";
import { connectDB } from "@/lib/connectDB";

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

        const result = await Projects.find().sort({createdAt: -1}).toArray();
        return result;

    } catch (err) {
        console.error("Project creation error: ", err);
        return []
    }
}