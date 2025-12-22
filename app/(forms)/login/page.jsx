import { auth, signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc"
import LoginForm from '@/Components/Forms/Login'
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function LoginPage() {
    const session = await auth()
    if(!!session) redirect('/dashboard')
    return (
        <main className="my-10">
            <h1 className="text-4xl font-semibold text-center m-6">Login</h1>
            <section className="bg-(--base-200) flex flex-col w-1/3 mx-auto items-center gap-2 p-8 rounded-2xl">
                <LoginForm />
                <form className="mx-auto w-fit m-2"
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button type="submit" className="trns btn btn-out flex gap-2 items-center"><FcGoogle /> Signin with Google</button>
                </form>
                <p className="text-xs space-x-1">
                    <span>Do not have any account?</span>
                    <Link href="/register" className="text-blue-500 font-medium trns hover:text-blue-700">Register</Link>
                </p>
            </section>
        </main>
    )
}