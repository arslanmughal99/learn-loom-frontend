import { atom, selector } from "recoil";

import { Course, PreviewLecture } from "../typings/course";
import localStorageEffect from "./localstorage-persistence";

export const courseContentDialogState = atom<boolean>({
    default: false,
    key: 'course-content-dialog',
})

export const coursePreviewCurrentLecture = atom<PreviewLecture | undefined>({
    default: undefined,
    key: 'course-preview-current-lecture'
})