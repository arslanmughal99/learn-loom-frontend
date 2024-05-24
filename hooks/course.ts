import { useQuery } from '@tanstack/react-query'


import { Course, CourseProgress } from '../typings/course';
import { useGetCookieKeys } from './auth';
import { getCookie } from 'cookies-next';

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

type CourseProgressQuery = {
    courseId: number;
}

export function useCourseProgress(query: CourseProgressQuery) {
    const { session: sKey } = useGetCookieKeys()
    const session = getCookie(sKey)

    return useQuery<CourseProgress>({
        retry: false,
        // refetchInterval: 60 * 20, // every 20 mins
        refetchOnWindowFocus: false,
        queryKey: ['get-course-progress', query], queryFn: async () => {
            const { courseId } = query;
            const searchParams = new URLSearchParams({ courseId: courseId.toString() });

            const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const url = endpoint + "/course/progress?" + searchParams.toString()
            const rawRes = await fetch(url, { headers: { Authorization: `Bearer ${session}` } });
            const res = await rawRes.json()
            return res;
        },
    });
}