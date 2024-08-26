import { Schema, model, models } from "mongoose";
const whatsappResponseSchema = new Schema({
  message: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  categories: { type: [String], required: true },
  created_at: { type: Date, default: Date.now },
  // Add other fields as necessary
});

const WhatsappResponse =
  models.WhatsappResponse || model("WhatsappResponse", whatsappResponseSchema);

export default WhatsappResponse;
