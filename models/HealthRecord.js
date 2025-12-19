import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema(
  {
    dogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },

    category: String,
    title: String,
    notes: String,
    date: Date,
  },
  { timestamps: true }
);

export default mongoose.models.HealthRecord ||
  mongoose.model("HealthRecord", HealthRecordSchema);
