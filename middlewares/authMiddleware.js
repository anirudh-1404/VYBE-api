import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decode.id).select("-password");
    console.log("req user", req.user);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Unauthorized!",
    });
  }
};
