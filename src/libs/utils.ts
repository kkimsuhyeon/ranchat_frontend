export const decodeToken = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    const result = JSON.parse(payload.toString());
    return result;
  } catch (e) {
    throw new Error("token 형식이 잘못되었습니다.");
  }
};

export const clearStoreage = () => {
  localStorage.clear();
};
