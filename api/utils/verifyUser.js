import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(errorHandler(401, "Unauthorized Request"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid Token"));
    req.user = user;
    next();
  });
};
