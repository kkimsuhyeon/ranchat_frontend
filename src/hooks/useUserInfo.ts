import { useRecoilValue } from "recoil";

import { updateUserInfo } from "store/userInfo";

function useUserInfo() {
  const userInfo = useRecoilValue(updateUserInfo);

  return userInfo;
}

export default useUserInfo;
