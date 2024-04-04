import { CourseInstructor } from "./user";


export type PreviewLecture = {
    id: number;
    title: string;
    video: string;
    preview: boolean;
    duration: number;
    thumbnail: string;
    createdAt: string;
    attachments: any[];
    description: string;
    quiz: any;
    instructor: CourseInstructor;
}