// customer.controller.js
const Customer = require('./models/customer.model');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const { name, email, mobileNumber, city } = req.body;
    console.log('Request Body:', { name, email, mobileNumber, city }); // Logging the request body
    const newCustomer = new Customer({ name, email, mobileNumber, city });
    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    await Customer.findByIdAndDelete(customerId);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other CRUD operations as needed (e.g., updateCustomer)
