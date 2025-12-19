import mongoose from "mongoose";

const FoodPhaseSchema = new mongoose.Schema({
  protein: String,
  fat: String,
  tips: [String],
});

const BreedFoodSchema = new mongoose.Schema({
  breed: { type: String, unique: true },

  puppy: FoodPhaseSchema,
  adult: FoodPhaseSchema,
  senior: FoodPhaseSchema,
});

export default mongoose.models.BreedFood ||
  mongoose.model("BreedFood", BreedFoodSchema);
