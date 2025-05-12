const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Routes
const applicationRoutes = require("./routes/applicationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();
console.log("✅ MONGO_URI loaded from .env:", process.env.MONGO_URI); 


const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse incoming JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Serve uploaded files

// MongoDB Connection to the main database (for applications, jobs, etc.)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); 
  });


// Routes
app.use("/api/application", applicationRoutes);  
app.use("/api/jobs", jobRoutes); 
app.use("/api/contact", contactRoutes);  


app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
