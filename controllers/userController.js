import { User } from "../models/userSchema.js";
import genToken from "../utils/authToken.js";
import { comparePassword, hashPassword } from "../utils/hashedPassword.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(403).json({
        message: "All feilds are required!",
      });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(403).json({
        message: "User already exists!",
      });
    }

    const hashPass = await hashPassword(password);
    const user = await User.create({
      email,
      name,
      password: hashPass,
      avatar,
    });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
      maxAge: 24 * 60 * 60 * 2000,
    });

    return res.status(201).json({
      message: "User created successfully!",
      id: user._id,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        message: "All feilds are required!",
      });
    }

    const isEmailExists = await User.findOne({ email });

    if (!isEmailExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const comparePass = await comparePassword(password, isEmailExists.password);

    if (comparePass) {
      const token = await genToken(isEmailExists._id);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
        maxAge: 24 * 60 * 60 * 2000,
      });
      return res.status(200).json({
        message: "Logged in successfully!",
        id: isEmailExists._id,
        data: { email: email },
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
