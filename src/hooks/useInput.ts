import React, { useState, useCallback } from "react";

export interface useInputProps {
  defaultValue?: string;
  preChange?: () => void;
}

function useInput({ defaultValue = "", preChange }: useInputProps) {
  const [value, setValue] = useState<string>(defaultValue);

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
      preChange && preChange();
      const value = typeof e === "string" ? e : e.target.value;
      setValue(value);
    },
    [preChange]
  );

  return [value, change] as const;
}

export default useInput;
