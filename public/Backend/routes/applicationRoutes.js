const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Application = require('../models/Application');
require('dotenv').config();

// === File Upload Setup ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf';
  const isValidSize = req.headers['content-length'] < 4 * 1024 * 1024; // 4MB
  if (isPdf && isValidSize) cb(null, true);
  else cb(new Error('Only PDF files under 4MB are allowed'));
};

const upload = multer({ storage, fileFilter });

// === Email Setup ===
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// === Route ===
router.post('/apply', upload.single('resume'), async (req, res) => {
  const { name, email, phoneNo, shortNote, roleName } = req.body;
  const resume = req.file;

  if (!name || !email || !resume || !roleName) {
    return res.status(400).json({ message: 'Name, Email, Resume, and Role are required.' });
  }

  try {
    // Save application to MongoDB
    const newApplication = new Application({
      name,
      email,
      phoneNo,
      shortNote,
      roleName,
      resume: resume.filename
    });

    await newApplication.save();

    // === Email to Candidate ===
    await transporter.sendMail({
      from: `"Lamincap Technologies" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Application Received – ${roleName}`,
  
      html: `Dear ${name},

<p>Thank you for applying for the position of ${roleName} at Lamincap Technologies.</p>

<p>We have successfully received your application, and our recruitment team will review your profile shortly. If your qualifications match our requirements, we will contact you for the next steps.</p>

<p>We appreciate your interest in joining our team. </p>

<p>Best regards, </p>
 <p>HR Team,<br> Lamincap Technologies </p>
  
`


    });

    // === Email to Admin with resume attached ===
    const resumePath = path.join(__dirname, '../uploads', resume.filename);


    // Ensure file exists before attaching
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found at:', resumePath);
    }

    await transporter.sendMail({
      from: `" New Candidature-Lamincap Technologies" <${process.env.SMTP_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Application for ${roleName}`,
      text: `
A new application has been submitted.

Name: ${name}
Email: ${email}
Phone: ${phoneNo || 'N/A'}
Role Applied: ${roleName}
Short Note: ${shortNote || 'N/A'}
  `,
  attachments: [
    {
      filename: resume.originalname,
      path: resumePath
    }
  ]
    });

    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Application Error:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
