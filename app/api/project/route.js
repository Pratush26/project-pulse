import { auth } from "@/auth";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await auth();
        const data = await req.json();

        const db = await connectDB();
        const Users = db.collection("users");
        const Projects = db.collection("projects");

        const creater = await Users.findOne(
            { email: session.user?.email },
            { projection: { _id: 1, role: 1 } }
        );

        if (!creater || creater.role !== "admin") return NextResponse.json({ message: "Forbidden Access" }, { status: 403 });

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

        if (!result.acknowledged) return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
        
        return NextResponse.json({ message: "Successfully created project" }, { status: 201 });

    } catch (err) {
        console.error("Project creation error: ", err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}