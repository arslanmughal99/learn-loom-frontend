import { User } from "./user";
import { Category } from "./course";
import { Certificate } from "./certificate";


export type EnrollmentInstructor = Pick<User, "id" | "lastName" | "firstName" | "username" | "profileImage">;
export type EnrollmentAssociate = Omit<EnrollmentInstructor, "username">;

export type EnrollmentCertificate = Pick<Certificate, "id" | "createdAt">

export type Enrollment = {
    id: number;
    title: string;
    category: Category;
    lectures: number;
    progress: number;
    createdAt: string;
    thumbnail: string;
    description: string;
    enrolled: { expiry: string | null, id: number }
    instructor: EnrollmentInstructor;
    certificate: EnrollmentCertificate;
    billingType: "Free" | "Monthly" | "Lifetime";
    associates: EnrollmentAssociate[];
    review?: { rating: number; review: string }

}


export type EnrollmentsStats = {
    active: number | null;
    archived: number | null;
    completed: number | null;
}