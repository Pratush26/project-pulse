import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'

const adminRoutes = ['/manage-users', '/create-project', '/manage-projects', '/register']
const employeeRoutes = ['/', '/submit-task']
const clientRoutes = ['/', '/see-projects']

export default async function proxy(request) {
    const { pathname } = request.nextUrl

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    if (token && pathname === "/login") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (adminRoutes.includes(pathname) && token?.role === "admin") return NextResponse.next()
    if (employeeRoutes.includes(pathname) && token?.role === "employee") return NextResponse.next()
    if (clientRoutes.includes(pathname) && token?.role === "client") return NextResponse.next()
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Admin routes
        '/manage-users',
        '/create-project',
        '/manage-projects',
        '/register',

        // Employee routes
        '/submit-task',

        // Client routes
        '/see-projects',

        // Authenticated routes
        '/dashboard'
    ]
};
