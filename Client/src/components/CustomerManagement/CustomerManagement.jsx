import React, { useState, useEffect } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    city: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      console.log('Customer added successfully');
      fetchCustomers();
      setNewCustomer({ name: '', email: '', mobileNumber: '', city: '' });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:1337/api/customers/${customerId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      console.log('Customer deleted successfully');
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Customer Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            className="border-2 rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            className="border-2 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            name="mobileNumber"
            value={newCustomer.mobileNumber}
            onChange={handleInputChange}
            className="border-2 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newCustomer.city}
            onChange={handleInputChange}
            className="border-2 rounded-md p-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md col-span-4">Add Customer</button>
        </div>
      </form>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Mobile Number</th>
            <th className="border border-gray-400 px-4 py-2">City</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border border-gray-400 px-4 py-2">{customer.name}</td>
              <td className="border border-gray-400 px-4 py-2">{customer.email}</td>
              <td className="border border-gray-400 px-4 py-2">{customer.mobileNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{customer.city}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => handleDelete(customer._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
