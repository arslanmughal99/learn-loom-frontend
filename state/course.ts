import { atom } from "recoil";

import { Lecture } from "../typings/lecture";

export const courseContentDialogState = atom<boolean>({
    default: false,
    key: 'course-content-dialog',
})

export const coursePreviewCurrentLecture = atom<Lecture | undefined>({
    default: undefined,
    key: 'course-preview-current-lecture'
})