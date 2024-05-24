import { CourseInstructor } from "./user";

export type Lecture = {
    id: number;
    title: string;
    video?: string;
    preview: boolean;
    duration: number;
    thumbnail: string;
    instructor: CourseInstructor;
}

export type LectureGroup = {
    title: string;
    index: number;
    lectures: Lecture[]
}