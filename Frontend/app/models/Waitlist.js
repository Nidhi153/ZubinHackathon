import { Schema, model, models } from "mongoose";

const waitlistSchema = new Schema({
  waitlist_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  event_id: { type: String, required: true },
  signed_up_at: { type: Date, default: Date.now },
});

const Waitlist = models.Waitlist || model("Waitlist", waitlistSchema);

export default Waitlist;
