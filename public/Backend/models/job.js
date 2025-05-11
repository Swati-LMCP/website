const mongoose = require("mongoose");

// Job schema definition
const jobSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true },
  lastDate: { type: Date, required: true },
  workType: { type: String, required: true, enum: ['full-time', 'remote'] },  // Work type must be either 'full-time' or 'remote'
  description: { type: String, required: true },
  responsibilities: { type: String, required: true },
  qualifications: { type: String, required: true }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt timestamps

// MongoDB connection to 'jobdb'
const jobDB = mongoose.createConnection("mongodb://localhost:27017/jobdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Job model
const Job = jobDB.model("Job", jobSchema);

module.exports = Job;
