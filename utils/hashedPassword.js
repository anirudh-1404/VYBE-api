import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  console.log("salt", salt);
  const hashed = await bcrypt.hash(password, salt);
  console.log(hashed);

  return hashed;
};

export const comparePassword = async (hashedPassword, password) => {
  return await bcrypt.compare(hashedPassword, password);
};
