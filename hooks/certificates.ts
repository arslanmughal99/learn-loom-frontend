import { useQuery } from "@tanstack/react-query";
import { GridCertificate } from "../typings/certificate";
import { useGetCookieKeys } from "./auth";
import { getCookie } from "cookies-next";

type CertificatesFilter = {
    page: number;
    size: number;
}

type Certificates = {
    total: number;
    certificates: GridCertificate[]
}


export function useGetCertificates(query: CertificatesFilter) {
    const { session: sKey } = useGetCookieKeys()
    const session = getCookie(sKey)

    return useQuery<Certificates>({
        retry: false,
        refetchOnWindowFocus: false,
        queryKey: ['get-certificates', query], queryFn: async () => {
            const { page, size } = query;

            const searchParams = new URLSearchParams({ page: page.toString(), size: size.toString() });

            const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const url = endpoint + "/certificate?" + searchParams.toString()
            const rawRes = await fetch(url, { headers: { Authorization: `Bearer ${session}` }, });
            const res = await rawRes.json()
            return res;
        }
    })
}