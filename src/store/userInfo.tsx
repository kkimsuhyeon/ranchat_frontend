import { atom, selector } from "recoil";

import { decodeToken } from "libs/utils";

export const userInfo = atom({
  key: "userInfo",
  default: {
    id: "",
    email: "",
  },
});

export const updateUserInfo = selector<{ id: string; email: string }>({
  key: "updateUserInfo",
  get: () => {
    const token = localStorage.getItem("token");
    if (token === null) return { email: "", id: "" };
    const result = decodeToken(token);
    if (result?.id === undefined || result?.email === undefined)
      return { email: "", id: "" };
    return {
      id: result.id,
      email: result.email,
    };
  },
});
