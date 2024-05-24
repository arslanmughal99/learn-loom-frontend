import { decode } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const sKey = process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!;
const rKey = process.env.NEXT_PUBLIC_REFRESH_COOKIE_KEY!;

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const redirect = [/student\/*/].findIndex((p) => p.test(path)) !== -1;

    const session = request.cookies.get(sKey)?.value;
    const refreshToken = request.cookies.get(rKey)?.value;
    if (!session && !refreshToken) {
        if (redirect) {
            return NextResponse.redirect(new URL("/login?error=Session expired.", request.url));
        } else {
            return NextResponse.next();
        }
    }

    if (!session && refreshToken) {
        const url = endpoint + "/refresh";
        const refreshRes = await fetch(url, { method: "POST", body: JSON.stringify({ refreshToken: refreshToken }), headers: { "Content-Type": "application/json" } });
        const token = await refreshRes.json();

        const res = NextResponse.next();
        const aToken = decode(token.accessToken, {
            json: true,
            complete: true,
        })?.payload as any;

        res.cookies.set(sKey, token.accessToken, {
            maxAge: aToken.exp - aToken.iat,
            expires: new Date(aToken.exp * 1000),
        });
        return res
    }

    return NextResponse.next();
}

export const config = {
    // matcher: ['/student/:path*']
}