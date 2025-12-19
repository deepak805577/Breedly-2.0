import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    dogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },

    type: {
      type: String,
      enum: ["vaccination", "deworming", "vet_visit"],
    },

    title: String,
    description: String,

    dueDate: Date,
    repeat: { type: String, default: "none" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", ReminderSchema);
