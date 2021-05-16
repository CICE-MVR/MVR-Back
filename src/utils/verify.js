import jwt from "jsonwebtoken";
import config from "../config";
import userModel from "../models/user.model";

export const user = (id) => {
  return userModel.findById({ _id: id });
};

export const token = async (token, name) => {
  try {
    if (!token) {
      throw new Error("token empty");
    }
    const decode = jwt.verify(token, config.jwt.secret);
    return decode;
  } catch (err) {
    throw err;
  }
};

export default {
  token,
  user,
};
