const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defines the schema for an individual, actionable task.
const taskSchema = new Schema(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Request",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["queued", "assigned", "under_review", "completed", "denied"],
      default: "queued",
    },
    assignmentType: {
      type: String,
      required: true,
      enum: ["competitive", "direct"], // 'competitive' for unverified, 'direct' for verified
    },
    assignedWorkerIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    completedByWorkerId: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      default: null,
    },
    pointsValue: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
