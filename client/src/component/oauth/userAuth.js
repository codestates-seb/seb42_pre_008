import { atom } from "recoil";

const userAtom = atom({
    key: 'user',
    default: 'not',
});

export default userAtom;