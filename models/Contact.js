const mongoose = require("mongoose");

// Connect to a different database for contact messages
const contactDB = mongoose.createConnection("mongodb://localhost:27017/contactdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error handling for connection
contactDB.on('error', (err) => {
  console.error('❌ ContactDB connection error:', err);
});

// Define the schema for contact messages
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z ]+$/, "Only letters and spaces allowed"]
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z ]+$/, "Only letters and spaces allowed"]
  },
  email: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"]
  },
  phone: {
    type: String,
    match: [/^\+?[0-9]{7,15}$/, "Only numbers and + allowed"]
  },
  message: {
    type: String,
    required: true,
    minlength: [20, "Please enter at least 20 characters"]
  }
}, {
  timestamps: true
});

// Create and export the model using the contactDB connection
const Contact = contactDB.model('Contact', contactSchema);
module.exports = Contact;
