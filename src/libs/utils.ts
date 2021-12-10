export const decodeToken = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    const result = JSON.parse(payload.toString());
    return result;
  } catch (e) {
    clearStoreage();
    window.location.href = "/login";
  }
};

export const clearStoreage = () => {
  localStorage.clear();
};
