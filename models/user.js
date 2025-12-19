import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,

    avatar: String,
    role: { type: String, default: "user" },

    preferences: {
      notifications: { type: Boolean, default: true },
      theme: { type: String, default: "light" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
