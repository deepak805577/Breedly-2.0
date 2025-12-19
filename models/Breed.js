import mongoose from "mongoose";

const BreedSchema = new mongoose.Schema({
  name: { type: String, unique: true },

  size: String,
  energy: String,
  grooming: String,
  expenses: String,

  temperament: [String],
  overview: String,
  image: String,
});

export default mongoose.models.Breed ||
  mongoose.model("Breed", BreedSchema);
