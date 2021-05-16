import jwt from "jsonwebtoken";
import config from "../../config";
import { userModel } from "../../models/user.model";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ err: "Invalid payload: email and password is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ err: "Unauthorized: incorrect email or password" });
    }

    const match = await userModel.comparePassword(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ err: "Unauthorized: incorrect email or password" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.signup.time,
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel({ username, email, password }).save();

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
