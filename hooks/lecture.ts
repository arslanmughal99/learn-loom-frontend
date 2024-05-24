// import { useQuery } from '@tanstack/react-query'

// import { Lecture } from '../typings/lecture';

// type LecturePreviewFilter = {
//     courseId: number;
// }

// export function useGetPublicCourses(query: LecturePreviewFilter) {
//     return useQuery<Lecture>({
//         queryKey: ['get-public-courses', query], queryFn: async () => {

//             const { courseId } = query;
//             if (!courseId) return
//             const searchParams = new URLSearchParams({ page: "1", size: "500", courseId: courseId.toString() });

//             const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
//             const url = endpoint + "/lecture?" + searchParams.toString()
//             const rawRes = await fetch(url);
//             const res = await rawRes.json()
//             return res;
//         }
//     })
// }