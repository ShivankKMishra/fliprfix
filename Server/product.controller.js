// product.controller.js
const Product = require('./models/product.model');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, image, price, category } = req.body; // Correct field names
    console.log('Request Body:', { name, description, image, price, category }); // Logging the request body
    const newProduct = new Product({ name, description, image, price, category }); // Correct field names
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
