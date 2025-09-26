const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defines the schema for a worker.
const WorkerSchema = new Schema(
  {
    name: {
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
    status: {
      type: String,
      required: true,
      enum: ['unverified', 'verified', 'suspended'], 
      default: 'unverified',
    },

    trait: {
      type: [String],
      default: []
    },

    points: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String], // An array of strings representing worker skills
      default: [],
    },
    canDenyTasks: {
        type: Boolean,
        default: false, // Only verified workers might have this set to true
    }
  },
  {
    timestamps: true,
  }
);

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;
