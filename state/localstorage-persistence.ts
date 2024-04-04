import { AtomEffect } from "recoil";

export default function localStorageEffect(key: string): AtomEffect<any> {
    if (typeof window === 'undefined') return () => undefined;
    return ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue));
        });
    }
}