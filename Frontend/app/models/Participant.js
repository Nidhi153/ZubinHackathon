import { Schema, model, models } from "mongoose";
//extending User model: Volunteer, Participant, Admin
const participantSchema = new Schema({
    // NOT SURE IF THESE ARE CORRECT
    user: { type: Schema.Types.ObjectId, ref: "User" },
    // Add other fields as necessary
});

const Participant = models.Participant || model("Participant", participantSchema);

export default Participant;