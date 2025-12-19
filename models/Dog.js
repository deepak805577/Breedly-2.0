import mongoose from "mongoose";

const DogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    breed: { type: String, required: true },

    gender: String,
    birthDate: Date,

    ageGroup: {
      type: String,
      enum: ["puppy", "adult", "senior"],
      required: true,
    },

    weightKg: Number,
    sterilized: Boolean,

    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Dog ||
  mongoose.model("Dog", DogSchema);
