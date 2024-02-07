import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 8) {
          new Error("Password must be atleast 8 characters");
        }
      },
    },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    pin: { type: String },
    city: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const pass = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(pass, salt);
});

export const User = models?.User || model("User", UserSchema);
