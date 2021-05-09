import mongoose from "mongoose";
import config from "./config";

import { Schema, model } from "mongoose";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const role = model("role", RoleSchema);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const createRoles = async () => {
  try {
    const count = await role.estimatedDocumentCount();
    if (count > 0) {
      return;
    }

    const res = await Promise.all([
      new role({ name: "user" }).save(),
      new role({ name: "admin" }).save(),
    ]);

    console.log("xxx res: ", res);
  } catch (err) {
    console.error(err);
  }
};

mongoose
  .connect(config.db.mongo.host, options)
  .then(async (db) => {
    await createRoles();
  })
  .catch((err) => console.log(err));
