import { atom, selector } from "recoil"

export const counterAtom = atom({
    key: "counter",
    default: 0
})

export const isEvenSelector = selector({
    key: "isEvenSelector",
    get: ({ get }) => {
        const value = get(counterAtom);

        return !(value % 2);
    }
})