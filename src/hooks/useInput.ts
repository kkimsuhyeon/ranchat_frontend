import React, { useState, useCallback } from "react";

export interface useInputProps {
  defaultValue?: string;
}

function useInput({ defaultValue = "" }: useInputProps) {
  const [value, setValue] = useState<string>(defaultValue);

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;
      setValue(value);
    },
    []
  );

  return [value, change] as const;
}

export default useInput;
