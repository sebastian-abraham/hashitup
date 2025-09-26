const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  skills: {
    type: [String],
    required: false,
    default: [],
  },
  status: {
    type: String,
    required: false,
    enum: ["Student", "Graduate", "Working", "Unemployed", ""],
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
