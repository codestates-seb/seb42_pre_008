import { atom } from "recoil";

const authAtom = atom({
    key: 'auth',
    default: 'not',
});

export default authAtom;