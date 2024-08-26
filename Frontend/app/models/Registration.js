import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const registrationSchema = new Schema({
  registration_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  event_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  role: { type: String, default: "participant" },
});

const Registration = models.Registration || model("Registration", registrationSchema);

export default Registration;
