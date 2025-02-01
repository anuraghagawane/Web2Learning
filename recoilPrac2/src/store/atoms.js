import { atom, selector, atomFamily, selectorFamily } from "recoil"
import axios from "axios"

export const TodoAtom = atom({
    key: "todoAtom",
    default: selector({
        key: "todoSelector",
        get: async (id) => {
            console.log(id);

            const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            return res.data.title;
        }
    }),
})

export const todoAtomFamily = atomFamily({
    key: "todoFamily",
    default: selectorFamily({
        key: "todoFamilySelector",
        get: (id) => async () => {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
            return res.data.title;
        }
    })
})