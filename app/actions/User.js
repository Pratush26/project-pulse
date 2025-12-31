"use server"
import { requireRole } from "@/lib/authorize";
import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

export async function registerUser(data) {
    try {
        await requireRole(["admin"])
        const db = await connectDB()
        const Users = db.collection("users")
        const exists = await Users.findOne({ email: data?.email })
        if (!!exists) return { success: false, message: "User already exists" };

        const hashPassword = await bcrypt.hash(data.password, 10);
        const result = await Users.insertOne({
            name: data.name,
            email: data.email,
            password: hashPassword,
            photo: data.photo,
            phone: data.phone,
            address: data.address,
        })
        if (!result.acknowledged) return { success: false, message: "Failed to register user" };
        return { success: true, message: "Successfully registered user" };
    } catch (err) {
        console.error("Register User error: ", err)
        return { success: false, message: "Something went wrong!" };
    }
}

export async function getUsers(data) {
    try {
        const db = await connectDB()
        const Users = db.collection("users")
        const query = {}
        if (!!data?.role) query.role = data.role
        const res = await Users.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "projects",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$client", "$$userId"] },
                                status: { $nin: ["completed"] }
                            }
                        },
                        { $count: "count" }
                    ],
                    as: "clientProjects"
                }
            },
            {
                $lookup: {
                    from: "projects",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$$userId", "$employees"] },
                                status: { $nin: ["completed"] }
                            }
                        },
                        { $count: "count" }
                    ],
                    as: "employeeProjects"
                }
            },
            {
                $addFields: {
                    projectsCount: {
                        $cond: [
                            { $eq: ["$role", "client"] },
                            { $ifNull: [{ $arrayElemAt: ["$clientProjects.count", 0] }, 0] },
                            { $ifNull: [{ $arrayElemAt: ["$employeeProjects.count", 0] }, 0] }
                        ]
                    }
                }
            },
            {
                $project: {
                    projectsCount: 1,
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: 1,
                }
            },
            { $sort: { assignedCount: 1 } }
        ]).toArray();
        const result = res.map(user => ({ ...user, _id: user._id.toString() }));
        return result ?? [];

    } catch (err) {
        console.error("Register User error: ", err)
        return [];
    }
}