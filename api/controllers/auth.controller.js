import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const auth = (req, res) => {
  res.json({
    message: "Auth API Working",
  });
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
