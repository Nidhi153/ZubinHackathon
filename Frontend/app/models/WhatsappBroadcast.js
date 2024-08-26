import { Schema, model, models } from "mongoose";
const whatsappBroadcastSchema = new Schema({
    broadcast_id: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    contacts: [{ type: Number, required: true }]
    // Add other fields as necessary
});

const WhatsappBroadcast = models.WhatsappBroadcast || model("WhatsappBroadcast", whatsappBroadcastSchema);

export default WhatsappBroadcast;