import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  venue: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  start_datetime: { type: String, required: true },
  end_datetime: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  required_skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  // Add other fields as necessary
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
