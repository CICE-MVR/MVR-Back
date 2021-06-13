import mongoose from "mongoose";
import config from "./config";

import { userModel } from "./models/user.model";

const createTestUsers = async () => {
  try {
    const count = await userModel.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    await Promise.all([
      new userModel({
        username: "Vero",
        email: "vero@vero.com",
        password: "verovero",
      }).save(),
      new userModel({
        username: "VeroTest",
        email: "test@vero.com",
        gameHistory: {
          wins: 1,
          total: 3,
        },
        password: "verovero",
      }).save(),
    ]);
  } catch (err) {
    console.error(err);
  }
};

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(config.db.mongo.host, options)
  .then(async (_db) => {
    await createTestUsers();
  })
  .catch((err) => console.log(err));
