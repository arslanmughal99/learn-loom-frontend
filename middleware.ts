import { setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    
    // setCookie(process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!, request.cookies.getAll().toString())
}

// export const config = {
//     matcher: "*"
// }