import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "member" },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  contact_number: { type: String, required: true },
  // Add other fields as necessary
});

const User = models.User || model("User", userSchema);

export default User;
