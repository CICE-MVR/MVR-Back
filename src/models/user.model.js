import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gameHistory: {
      wins: Number,
      total: Number,
    },
    follows: [
      {
        ref: "user",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const encrypt = await bcrypt.hash(this.password, salt);
  this.password = encrypt;
});

userSchema.statics.comparePassword = async (password, encodePass) => {
  return await bcrypt.compare(password, encodePass);
};

export const userModel = model("user", userSchema);
