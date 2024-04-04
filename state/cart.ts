import { atom, selector } from "recoil";

import localStorageEffect from "./localstorage-persistence";
import { Course } from "../typings/course";

export const cartState = atom<any[]>({
    key: 'cart',
    default: [],
    effects: [localStorageEffect('cart-items')]
})

export function useAddedToCart(id: number) {
    const addedToCartSelector = selector<Course | null>({
        key: "added-to-cart", get: ({ get }) => {
            const cartItems = get(cartState);
            return cartItems.find((i) => i.id === id)
        }
    });
    return addedToCartSelector;
}