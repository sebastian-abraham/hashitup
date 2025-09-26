const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      default:null
    },
  }
  { timestamps: true }
);

module.exports = mongoose.model("client", ClientSchema);
