import { User } from "./user";

export type ReviewUser = Pick<User, "id" | "username" | "profileImage">

export type ReviewCourse = {
    id: number;
    title: string;
    thumbnail: string;
}

export type Review = {
    id: number;
    rating: number;
    review: string;
    user: ReviewUser;
    course: ReviewCourse;
}