import { atom } from "recoil";


export const certificateReceivedDialogState = atom<boolean>({
    default: false,
    key: 'certificate-received-dialog',
})