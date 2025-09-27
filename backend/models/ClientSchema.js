const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defines the schema for a client, integrated with Firebase Authentication.
const clientSchema = new Schema(
  {
    // The Firebase UID is the primary link to the authentication service.
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true, // Index for fast lookups based on the authenticated user.
    },
    name: {
      type: String,
      required: true,
    },
    // Email and password are now handled by Firebase, so they are removed from this schema.
    companyName: {
      type: String,
      default: "",
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps.
    timestamps: true,
  },
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
