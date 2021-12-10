import { atom, selector } from "recoil";

import { decodeToken } from "libs/utils";

export const userInfo = atom({
  key: "userInfo",
  default: {
    id: "",
    email: "",
  },
});

export const updateUserInfo = selector({
  key: "updateUserInfo",
  get: () => {
    const token = localStorage.getItem("token");
    if (token === null) return { email: "", id: "" };
    const result = decodeToken(token);
    return {
      id: result.id,
      email: result.email,
    };
  },
});
