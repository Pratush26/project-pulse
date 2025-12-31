"use server"
import { requireRole } from "@/lib/authorize";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function createFeedback(data) {
    try {
        const creater = await requireRole(["admin", "client"])
        const db = await connectDB();

        const result = await db.collection("feedbacks").insertOne({
            comment: data?.comment,
            flag: data.flag ?? false,
            projecId: new ObjectId(data?.projecId),
            rating: Number(data?.rating),
            provider: new ObjectId(creater.user?._id),
            createdAt: new Date().toISOString(),
        });
        if (!result.acknowledged) return { success: false, message: "Failed to submit feedback" };

        return { success: true, message: "Successfully submitted feedback" };

    } catch (err) {
        console.error("Feedback submission error: ", err);
        return { success: false, message: "Something went wrong!" }
    }
}