import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { decodeToken } from "libs/utils";

import { userInfo } from "store/userInfo";

function useUserInfo() {
  const setUserInfo = useSetRecoilState(userInfo);

  const setter = useCallback((token: string) => {
    const result = decodeToken(token);
    console.log(result);
  }, []);

  return setter;
}

export default useUserInfo;
