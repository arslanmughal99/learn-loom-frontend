import { decode } from "jsonwebtoken";
import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

import { AccessTokenContent } from "@/typings/user";

export function useGetCookieKeys() {
    const session = process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!;
    const refresh = process.env.NEXT_PUBLIC_REFRESH_COOKIE_KEY!;

    return {
        session, refresh
    }
}

export function useGetUserAuthInfo() {
    const { data, isLoading } = useQuery<AccessTokenContent | undefined>({
        retry: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryKey: ["get-auth-content"],
        queryFn: () => {
            const sKey = process.env.NEXT_PUBLIC_ACCESS_COOKIE_KEY!;
            const session = getCookie(sKey);

            if (!session) throw new Error("session not found");

            const jwt = decode(session, { json: true, complete: true });

            if (!jwt) throw new Error("invalid session");

            return { ...jwt.payload as AccessTokenContent }
        }
    })

    return { user: data, isLoading }
}