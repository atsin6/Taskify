import bcrypt from "bcrypt";

export async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}
