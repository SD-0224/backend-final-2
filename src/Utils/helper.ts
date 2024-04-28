import crypto from "crypto";

const generateFakeSecretKey = () => {
  return crypto.randomBytes(64).toString("hex");
};
export default generateFakeSecretKey;
