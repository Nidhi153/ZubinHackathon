import { Schema, model, models } from "mongoose";
//extending User model: Volunteer, Participant, Admin
const whatsappResponseSchema = new Schema({
  message: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  categories: { type: [String], required: true },
  // Add other fields as necessary
});

const WhatsappResponse =
  models.WhatsappResponse || model("WhatsappResponse", whatsappResponseSchema);

export default WhatsappResponse;
