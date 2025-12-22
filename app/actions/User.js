"use server"
import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

export async function registerUser(data) {
    try {
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