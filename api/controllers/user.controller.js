import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { createAssessment } from "../utils/reCaptcha.js";

export const test = (req, res) => {
  res.json({
    message: "API Working",
  });
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        errorHandler(401, "You are Unauthorized to Perform this Action")
      );
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const { username, email, avatar, recaptchaToken } = req.body;
    const recaptcha = await createAssessment(recaptchaToken, "UPDATE_USER");

    if (recaptcha.riskAnalysis.score >= 0.5) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username,
            email,
            password: req.body.password,
            avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
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

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You are Unauthorized to Perform this Action")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...!!");
  } catch (error) {
    next(error);
  }
};
