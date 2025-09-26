const mongoose = require("mongoose");

const panelUserSchema = new mongoose.Schema(
  {
    firebaseUid: {
    type: String,
    required: true,
    unique: true,
    },
    Name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);