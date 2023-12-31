import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { generate } from "generate-password";
import { createAssessment } from "../utils/reCaptcha.js";

export const auth = (req, res) => {
  res.json({
    message: "Auth API Working",
  });
};

export const signup = async (req, res) => {
  try {
    const { username, email, password, recaptchaToken } = req.body;
    const recaptcha = await createAssessment(recaptchaToken, "SIGNUP");

    if (recaptcha.riskAnalysis.score >= 0.5) {
      const user = await User.findOne({ email });
      if (user) return next(errorHandler(409, "User Already Exists !!"));
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } else {
      return next(
        errorHandler(
          409,
          "Cannot verify recaptcha. Please refresh and try again !"
        )
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        error_msg: error,
      },
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password, recaptchaToken } = req.body;
    const recaptcha = await createAssessment(recaptchaToken, "LOGIN");

    if (recaptcha.riskAnalysis.score >= 0.5) {
      const user = await User.findOne({ email });
      if (!user) return next(errorHandler(404, "User Not Found"));
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      return next(
        errorHandler(
          409,
          "Cannot verify recaptcha. Please refresh and try again !"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, recaptchaToken } = req.body;
    const recaptcha = await createAssessment(recaptchaToken, "GOOGLE_SIGN_IN");

    if (recaptcha.riskAnalysis.score >= 0.5) {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        res
          .cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          })
          .status(200)
          .json(rest);
      } else {
        const generatePassword = generate({
          length: 10,
          numbers: true,
        });
        const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
        const newUser = await User.create({
          username:
            req.body.name.split(" ").join("").toLowerCase() +
            generate({ length: 5, numbers: true, exclude: String }),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.avatar,
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        res
          .cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
          })
          .status(200)
          .json(rest);
      }
    } else {
      return next(
        errorHandler(
          409,
          "Cannot verify recaptcha. Please refresh and try again !"
        )
      );
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token").status(200).json("Signout success!");
};
