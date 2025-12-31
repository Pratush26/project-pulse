import { auth } from "@/auth";
import RegistrationForm from "@/Components/Forms/Register";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

export default async function RegistrationPage() {
    const session = await auth()
        if(!!session) redirect('/dashboard')
    return (
        <main className="my-10 w-full">
            <h1 className="text-4xl font-semibold text-center m-6">Create An Account</h1>
            <section className="bg-(--base-200) flex flex-col w-1/3 mx-auto items-center gap-2 p-6 rounded-2xl">
                <RegistrationForm />
                <p className="text-xs space-x-1">
                    <span>Already have an account?</span>
                    <Link href="/login" className="text-blue-500 font-medium trns hover:text-blue-700">Sign In</Link>
                </p>
            </section>
        </main>
    )
}