

export type ActiveAssignment = {
    id: number;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    marksObtained: null | number;
    assignment: AssignmentDetails;
    status: "Failed" | "Passed" | "Submited" | "Incomplete"
}

export type AssignmentDetails = {
    title: string;
    minMarks: number;
    maxMarks: number;
    lecture: AssignmentLecture;
    attachments: AssignmentAttachment[]
}

export type AssignmentAttachment = {
    url: string;
    name: string;
}

export type AssignmentLecture = {
    id: number;
    title: string;
    thumbnail: string;
    course: AssignmentLectureCourse;
}

export type AssignmentLectureCourse = {
    id: number;
    title: string;
}