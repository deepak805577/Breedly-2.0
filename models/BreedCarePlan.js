import mongoose from "mongoose";

const CarePhaseSchema = new mongoose.Schema({
  meals: String,
  exercise: String,
  grooming: String,
  healthFocus: String,
});

const BreedCarePlanSchema = new mongoose.Schema({
  breed: { type: String, unique: true },

  puppy: CarePhaseSchema,
  adult: CarePhaseSchema,
  senior: CarePhaseSchema,
});

export default mongoose.models.BreedCarePlan ||
  mongoose.model("BreedCarePlan", BreedCarePlanSchema);
