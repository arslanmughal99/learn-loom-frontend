export type UserAuthInfo = { username: string; img: string }

export type User = {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    role: string;
    profileImage: string;
    email: string;
    bio: string;
    jobTitle: string;
    coverImage: string;
    timezone: string;
    rights: any;
    verified: boolean;
    identified: boolean;
}

export type AccessTokenContent = Pick<User, "username" | "firstName" | "lastName" | "role" | "profileImage" | "email" | "rights"> & { facebookid?: string };



export type CourseInstructor = Pick<User, "id" | "username" | "firstName" | "lastName" | "profileImage">;
export type CourseAssociate = Pick<User, "id" | "firstName" | "lastName" | "profileImage">;
export type CourseDetailsInstructor = Pick<
    User, "id" | "username" | "firstName" | "lastName" | "profileImage" | "bio"
>
    & { enrollments: number, reviews: number, rating: number, courses: number };