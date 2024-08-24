import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  skill_id: { type: String, required: true, unique: true },
  skill_name: { type: String, required: true },
  // Add other fields as necessary
});

const Skill = models.Skill || model("Skill", skillSchema);

export default Skill;
