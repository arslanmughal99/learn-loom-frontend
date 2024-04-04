import { useQuery } from '@tanstack/react-query'
import { Review } from '../typings/review';


type ReviewsSearchFilter = {
    page: number;
    size: number;
    courseId: number;
}

export function useGetCourseReviews(query: ReviewsSearchFilter) {
    return useQuery<{ total: number, reviews: Review[] }>({
        refetchOnWindowFocus: false,
        queryKey: ['get-course-reviews', query], queryFn: async () => {

            const { page, size, courseId } = query;
            const searchParams = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
                courseId: courseId.toString()
            });

            const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
            const url = endpoint + "/course/review?" + searchParams.toString()
            const rawRes = await fetch(url);
            const res = await rawRes.json()
            return res;
        }
    })
}