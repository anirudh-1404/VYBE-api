import jwt from "jsonwebtoken";

const genToken = async (id) => {
  return await jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

export default genToken;
