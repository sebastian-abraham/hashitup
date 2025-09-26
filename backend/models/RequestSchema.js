const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defines the schema for a client's job request.
const requestSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId, // This is the reference to the MongoDB document ID.
      required: true,
      ref: "Client", // Links this to the Client model.
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
