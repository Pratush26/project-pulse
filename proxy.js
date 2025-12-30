import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'

const publicRoutes = ['/', '/contact']

export default async function proxy(request) {
    const { pathname } = request.nextUrl
    if (publicRoutes.includes(pathname)) return NextResponse.next()

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });
    if (!token && pathname === "/login") return NextResponse.next()
    if (token && pathname === "/login") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (!token) return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)).*)']
}