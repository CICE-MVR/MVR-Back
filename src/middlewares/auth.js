import verify from "../utils/verify";
import config from "../config";
import { userModel } from "../models/user.model";

export const verifyUser = async (req, res, next) => {
  try {
    const minPassLenght = config.passwordMinLenght;

    const { username, email, password } = req.body;

    if (!username || !email || !password || password.length < minPassLenght) {
      return res.status(400).json({
        err: "Invalid payload",
        fields: [
          !username ? "username is required" : null,
          !email ? "email is required" : null,
          !password ? "password is required" : null,
          password?.length < minPassLenght
            ? `password should have more than ${minPassLenght} letters`
            : null,
        ].filter((x) => x),
      });
    }

    const isEmail = /^[^@]+@[^@]+\.[^@]+$/.test(email);

    if (!isEmail) {
      throw new Error("email is malformed.");
    }

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("user already exist.");
    }

    next();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    await verify.token(token, "admin");

    next();
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = await verify.token(token, "user");
    const user = await verify.user(decode.id);
    if (!user) {
      throw new Error("forbidden");
    }

    next();
  } catch (err) {
    res.status(401).json({ err: err.message });
  }
};

// Sessions.
export const verifySession = async (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ err: "Unauthorized" });
  }
  next();
};
