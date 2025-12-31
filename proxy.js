import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/contact']
const adminRoutes = ['/manage-users', '/create-project', '/manage-projects', '/register']
const employeeRoutes = ['/', '/submit-task']
const clientRoutes = ['/', '/see-projects']
const authenticateRoutes = ['/', '/dashboard']

export default async function proxy(request) {
    const { pathname } = request.nextUrl
    if (publicRoutes.includes(pathname)) return NextResponse.next()

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });
    if (!token && pathname === "/login") return NextResponse.next()
    if (token && pathname === "/login") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    if (authenticateRoutes.includes(pathname)) return NextResponse.next()
    if (adminRoutes.includes(pathname) && token.role === "admin") return NextResponse.next()
    if (employeeRoutes.includes(pathname) && token.role === "employee") return NextResponse.next()
    if (clientRoutes.includes(pathname) && token.role === "client") return NextResponse.next()
    return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)).*)']
}