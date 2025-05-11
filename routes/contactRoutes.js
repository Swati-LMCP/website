const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); 

// POST route to submit contact form
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Create new contact form entry
    const newContact = new Contact({ firstName, lastName, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error: error.message });
  }
});

// GET route to fetch all contact form entries
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
});

module.exports = router;
