// models/application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must not exceed 50 characters'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator: function(value) {
        // Simple email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: 'Please enter a valid email address',
    },
  },

  phoneNo: {
    type: String,
    validate: {
      validator: function(value) {
       
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(value);
      },
      message: 'Please enter a valid 10-digit phone number',
    },
  },

  shortNote: {
    type: String,
    maxlength: [200, 'Short note must not exceed 200 characters'],
  },

  resume: {
    type: String,
    required: [true, 'Resume is required'],
    trim: true,
  },

  roleName: {
    type: String,
    required: [true, 'Role name is required'],
    trim: true,
    minlength: [3, 'Role name must be at least 3 characters long'],
    maxlength: [100, 'Role name must not exceed 100 characters'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
