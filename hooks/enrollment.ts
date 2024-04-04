import { useQuery } from "@tanstack/react-query";

import { Enrollment, EnrollmentsStats } from "../typings/enrollment";
import { useGetCookieKeys } from "./auth";
import { getCookie } from "cookies-next";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function useGetEnrollmentsStats() {
    const url = endpoint + "/enrollment/stats"
    const { session: sKey } = useGetCookieKeys()
    const session = getCookie(sKey)

    return useQuery<EnrollmentsStats>({
        retry: true,
        refetchOnWindowFocus: false,
        queryKey: ['get-student-enrollments-status'],
        queryFn: async () => {
            const rawRes = await fetch(url, { headers: { Authorization: `Bearer ${session}` }, });
            const res = await rawRes.json()
            return res;
        }
    })
}

export type GetEnrollmentQuery = {
    page: number;
    size: number;
    search?: string;
    status?: "Active" | "Archived" | "Completed"
}

export function useGetEnrollments(query: GetEnrollmentQuery) {
    const { session: sKey } = useGetCookieKeys()
    const session = getCookie(sKey)

    return useQuery<{ total: number; courses: Enrollment[] }>({
        refetchOnWindowFocus: false,
        queryKey: ["get-student-enrollments", query],
        queryFn: async () => {
            const { page, size, status, search } = query;
            const params = new URLSearchParams({ page: page.toString(), size: size.toString() })
            if (status) params.set("status", status);
            if (search) params.set("search", search);

            const url = endpoint + "/course/enrolled?" + params.toString();

            const rawRes = await fetch(url, { headers: { Authorization: `Bearer ${session}` }, });
            const res = await rawRes.json()

            return res;
        }
    });

}