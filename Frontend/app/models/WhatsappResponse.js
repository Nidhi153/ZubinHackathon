import { Schema, model, models } from "mongoose";
//extending User model: Volunteer, Participant, Admin
const whatsappResponseSchema = new Schema({
    response_id: { type: String, required: true, unique: true },
    message: { type: String, required: true},
    contacts: { type: Number, required: true },
    user_id: { type: String, required: true },
    tags: { type: [String], required: true },
    // Add other fields as necessary
});

const WhatsappResponse = models.WhatsappResponse || model("WhatsappResponse", whatsappResponseSchema);

export default WhatsappResponse;