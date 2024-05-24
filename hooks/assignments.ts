import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";

import { useGetCookieKeys } from "./auth";
import { ActiveAssignment } from "../typings/assignment";

type AssignmentsFilter = {
    page: number;
    size: number;
    status?: "Failed" | "Passed" | "Submited" | "Incomplete"
}

type Assignments = {
    total: number;
    assignments: ActiveAssignment[]
}


export function useGetActiveAssignments(query: AssignmentsFilter) {
    const { session: sKey } = useGetCookieKeys()
    const session = getCookie(sKey)

    return useQuery<Assignments>({
        retry: false,
        refetchOnWindowFocus: false,
        queryKey: ['get-assignments', query], queryFn: async () => {
            const { page, size, status } = query;

            const searchParams = new URLSearchParams({ page: page.toString(), size: size.toString() });
            if (status) searchParams.append("status", status);

            const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const url = endpoint + "/assignment?" + searchParams.toString()
            const rawRes = await fetch(url, { headers: { Authorization: `Bearer ${session}` }, });
            const res = await rawRes.json()
            return res;
        }
    })
}