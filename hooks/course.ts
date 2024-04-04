import { useQuery } from '@tanstack/react-query'


import { Course } from '../typings/course';

type CourseSearchFilter = {
    page: number;
    size: number;
    search?: string;
    categoryId?: number;
}

export function useGetPublicCourses(query: CourseSearchFilter) {
    return useQuery<{ total: number, courses: Course[] }>({
        retry: false,
        refetchOnWindowFocus: false,
        queryKey: ['get-public-courses', query], queryFn: async () => {
            const { page, size, categoryId, search } = query;

            if (!search && !categoryId) throw new Error("search and category is required");

            const searchParams = new URLSearchParams({ page: page.toString(), size: size.toString() });
            if (search) searchParams.set('search', search.toString())
            if (categoryId) searchParams.set('categoryId', categoryId.toString())

            const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const url = endpoint + "/course?" + searchParams.toString()
            const rawRes = await fetch(url);
            const res = await rawRes.json()
            return res;
        }
    })
}