import { getToken } from "next-auth/jwt"
import { NextResponse } from 'next/server'

export async function proxy(request) {
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });
    if(!token) return NextResponse.redirect(new URL('/', request.url))
}
export const config = {
    matcher: ["/dashboard"]
}