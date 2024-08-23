import { Schema, model, models } from "mongoose";
//extending User model: Volunteer, Participant, Admin
const volunteerSchema = new Schema({
    // NOT SURE IF THESE ARE CORRECT
    user: { type: Schema.Types.ObjectId, ref: "User" },
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
    // Add other fields as necessary
});

const Volunteer = models.Volunteer || model("Volunteer", volunteerSchema);

export default Volunteer;