import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  issue: String,
  description: String,
  tip: String,
});

const BreedHealthSchema = new mongoose.Schema({
  breed: { type: String, unique: true },

  lifespan: String,
  weight: String,

  common_health_issues: [IssueSchema],

  age_warnings: {
    puppy: [String],
    adult: [String],
    senior: [String],
  },

  preventive_care: {
    vaccinations: [String],
    deworming: {
      puppies: String,
      adults: String,
    },
    tick_flea_control: String,
    spay_neuter: String,
    annual_vet_checks: [String],
  },
});

export default mongoose.models.BreedHealth ||
  mongoose.model("BreedHealth", BreedHealthSchema);
