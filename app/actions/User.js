import { connectDB } from "@/lib/connectDB";

export async function registerUser(params) {
    try {
        await connectDB()
        console.log("user registered successfully")
    } catch (err) {
        console.error("Register User error: ", err)
    }
}