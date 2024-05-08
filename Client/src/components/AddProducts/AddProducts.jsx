import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:1337/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, image, price: parseFloat(price), category }), // Convert price to number
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    // If successful, clear the form fields
    setName('');
    setDescription('');
    setImage('');
    setPrice('');
    setCategory('');
    setError('');

    // You can add any additional logic here, such as displaying a success message or redirecting
  } catch (error) {
    console.error('Error adding product:', error);
    setError('Failed to add product. Please try again later.');
  }
};

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mt-8 mb-4">Add Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL:</label>
          <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" min="0" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
