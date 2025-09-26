const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defines the schema for the work submitted by a worker for a specific task.
const submissionSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    workerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Worker",
    },
    content: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending_review", "approved", "rejected"],
      default: "pending_review",
    },
    reviewRating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
