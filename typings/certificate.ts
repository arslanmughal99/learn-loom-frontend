export type Certificate = {
    id: string;
    createdAt: string;
    user: CertificateUser;
    course: CertificateCourse;
}

export type CertificateCourse = {
    id: string;
    title: string;
    thumbnail:string;
    instructor: CertificateCourseInstructor;
}

export type CertificateCourseInstructor = {
    id: number;
    username: string;
}

export type CertificateUser = {
    id: number;
    lastName: string;
    username: string;
    firstName: string;
}

export type GridCertificate = {
    id: string;
    createdAt:string;
    course: CertificateCourse;
}