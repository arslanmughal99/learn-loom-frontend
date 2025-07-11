import { CourseAssociate, CourseDetailsInstructor, CourseInstructor } from "./user";

export type Category = {
    id: number;
    icon: string;
    title: string;
}

export type Course = {
    id: number;
    title: string;
    price: number;
    rating: number;
    lectures: number;
    createdAt: string;
    thumbnail: string;
    category: Category;
    description: string;
    billingType: String;
    instructor: CourseInstructor;
    associates: CourseAssociate[];
}

export type CourseEnrolled = {
    expiry: Date | null;
}

export type CourseFAQs = {
    title: string;
    answer: string;
}

export type CourseRequirements = {
    required: boolean;
    requirement: string;
}

export type PreviewLecture = {
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
    lectures: PreviewLecture[]
}


export type CourseDetailsRating = {
    total: number;
    onestar: number;
    twostar: number;
    threestar: number;
    fourstar: number;
    fivestar: number;
    average: number;
};

export type CourseDetails = {
    id: number;
    faqs: CourseFAQs[];
    title: string;
    price: number;
    thumbnail: string;
    createdAt: string;
    rating: CourseDetailsRating;
    students: number;
    category: Category;
    description: string;
    billingType: string
    groups: LectureGroup[],
    objectives: string[];
    lecturesCount: number
    enrolled: CourseEnrolled;
    associates: CourseAssociate[]
    requirements: CourseRequirements[];
    instructor: CourseDetailsInstructor;
}
