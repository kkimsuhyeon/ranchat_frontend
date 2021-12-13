import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { spinner } from "store/spinner";

function useSpinner() {
  const [isActive, setActive] = useRecoilState(spinner);

  const handleActive = useCallback(
    (isOpen: boolean) => {
      setActive(isOpen);
    },
    [setActive]
  );

  return [handleActive, isActive] as const;
}

export default useSpinner;
