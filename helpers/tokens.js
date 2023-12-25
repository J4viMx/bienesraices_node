import jwt from "jsonwebtoken";

const generarJWT = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const generarId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);

export { generarId, generarJWT };
