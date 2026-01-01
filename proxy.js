import { NextResponse } from 'next/server'
import { auth } from "./auth"

const adminRoutes = ['/manage-users', '/create-project', '/manage-projects', '/register']
const employeeRoutes = ['/submit-task']
const clientRoutes = ['/see-projects']

export default auth(async (request) => {
    const { pathname } = request.nextUrl

    const token = request.auth
    if (!token && pathname === "/login") return NextResponse.next()
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    const userRole = token?.user?.role;
    if (token && pathname === "/login") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (adminRoutes.includes(pathname) && userRole !== "admin") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (employeeRoutes.includes(pathname) && userRole !== "employee") return NextResponse.redirect(new URL('/dashboard', request.url))
    if (clientRoutes.includes(pathname) && userRole !== "client") return NextResponse.redirect(new URL('/dashboard', request.url))
    return NextResponse.next()
})

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
        '/dashboard',

        '/login'
    ]
};