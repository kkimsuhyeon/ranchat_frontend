import { atom } from "recoil";

export const userInfo = atom({
  key: "userInfo",
  default: {
    id: "",
    email: "",
  },
});
