import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function createToken(paylod, expiresIn = "10m") {
  return jwt.sign(paylod, JWT_SECRET, { expiresIn });
}

export function verifyJWT(token) {
  return jwt.verify(token, JWT_SECRET);
}
