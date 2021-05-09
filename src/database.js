import mongoose from "mongoose";
import config from "./config";

import models from "./models";

const createTestUsers = async () => {
  try {
    const count = await models.user.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    const res = await Promise.all([
      new models.user({
        username: "Vero",
        email: "vero@vero.com",
        password: "verovero",
      }).save(),
      new models.user({
        username: "VeroTest",
        email: "test@vero.com",
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
  .then(async (db) => {
    await createTestUsers();
  })
  .catch((err) => console.log(err));
