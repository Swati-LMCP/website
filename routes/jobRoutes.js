const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// Create a new job
router.post("/", async (req, res) => {
  try {
    const {
      role,
      experience,
      skills,
      employmentType,
      jobDescription,
      keyResponsibilities,
      qualifications,
      lastDate,
    } = req.body;

    if (
      !role ||
      !experience ||
      !skills ||
      !employmentType ||
      !jobDescription ||
      !keyResponsibilities ||
      !qualifications ||
      !lastDate
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newJob = new Job({
      roleName: role,
      experience: Number(experience),
      skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
      workType: employmentType,
      description: jobDescription,
      responsibilities: keyResponsibilities,
      qualifications,
      lastDate: new Date(lastDate),
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add job", details: err.message });
  }
});

// Get job by ID
router.get("/:id", async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch job", details: err.message });
    }
  });
  

// Fetch all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs", details: err.message });
  }
});

// Delete job
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Job not found" });

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job", details: err.message });
  }
});

// Update job
router.put("/:id", async (req, res) => {
  try {
    console.log("Request ID:", req.params.id);
    console.log("Request Body:", req.body);

    const {
      role,
      experience,
      skills,
      employmentType,
      jobDescription,
      keyResponsibilities,
      qualifications,
      lastDate,
    } = req.body;

    // Check if all fields are provided
    if (
      !role ||
      !experience ||
      !skills ||
      !employmentType ||
      !jobDescription ||
      !keyResponsibilities ||
      !qualifications ||
      !lastDate
    ) {
      return res.status(400).json({ error: "All fields are required for update." });
    }

    // Find and update the job
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        roleName: role,
        experience: Number(experience),
        skills: Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim()),
        workType: employmentType,
        description: jobDescription,
        responsibilities: keyResponsibilities,
        qualifications,
        lastDate: new Date(lastDate),
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found for update" });
    }

    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: "Failed to update job", details: err.message });
  }
});

module.exports = router;
