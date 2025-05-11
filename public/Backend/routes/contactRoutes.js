const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// POST route to submit contact form
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const newContact = new Contact({ firstName, lastName, email, phone, message });
    await newContact.save();

    // Send email to candidate
    await transporter.sendMail({
      from: `"LaminCap Technologies" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "We Have Received Your Contact Request",
      html: `
        <p>Dear ${firstName},</p>
        <p>Thank you for reaching out to us. We have successfully received your message and our team will get back to you as soon as possible.</p>
        <p>If you have any additional information to share in the meantime, feel free to reply to this email.</p>
        <p>Best regards,<br> LaminCap Technologies Team</p>
      `
    });

    // Send email to admin/HR
    await transporter.sendMail({
      from: `"New Query-LaminCap Techologies" <${process.env.SMTP_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.status(201).json({ message: "Contact form submitted successfully!" });

  } catch (error) {
    console.error("❌ Error:", error);
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

// ✅ DELETE route to delete a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ message: "Error deleting contact", error: error.message });
  }
});

module.exports = router;
