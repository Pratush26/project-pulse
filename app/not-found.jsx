import Link from "next/link";

export default function notFound() {
    return (
        <main className="flex gap-2 flex-col items-center justify-center min-h-[80vh] w-full">
            <h1 className="text-5xl font-semibold animate-bounce">404</h1>
            <p>The page you are looking for is not found!</p>
            <Link href='/' className="btn btn-primary trns">Go Back Home</Link>
        </main>
    )
}