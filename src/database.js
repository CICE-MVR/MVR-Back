import mongoose from "mongoose";
import config from "./config";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(config.db.mongo.host, options)
  .then(async (db) => {
    // await createRoles();
  })
  .catch((err) => console.log(err));
