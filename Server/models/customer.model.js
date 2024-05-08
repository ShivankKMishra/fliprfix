// models/customer.model.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
