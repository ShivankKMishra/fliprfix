import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, selectedPriceRange, searchQuery);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    filterProducts(selectedCategory, priceRange, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(selectedCategory, selectedPriceRange, query);
  };

  const filterProducts = (category, priceRange, query) => {
    let filtered = products;
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }
    if (priceRange !== 'All') {
      switch (priceRange) {
        case 'Under ₹50':
          filtered = filtered.filter(product => product.price < 50);
          break;
        case '₹50 - ₹100':
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case 'Over ₹100':
          filtered = filtered.filter(product => product.price > 100);
          break;
        default:
          break;
      }
    }
    if (query.trim() !== '') {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold mt-8 mb-4">All Products</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="category" className="mr-2">Category:</label>
          <select id="category" className="border rounded-md p-1" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="All">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Kitchenware">Kitchenware</option>
            <option value="Electronics">Electronics</option>
            {/* Add more options for other categories */}
          </select>
        </div>
        <div>
          <label htmlFor="priceRange" className="mr-2">Price Range:</label>
          <select id="priceRange" className="border rounded-md p-1" value={selectedPriceRange} onChange={(e) => handlePriceRangeChange(e.target.value)}>
            <option value="All">All</option>
            <option value="Under ₹50">Under ₹50</option>
            <option value="₹50 - ₹100">₹50 - ₹100</option>
            <option value="Over ₹100">Over ₹100</option>
          </select>
        </div>
        <div>
          <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="border rounded-md p-1" />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover object-center" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-800 font-semibold">₹{product.price}</p>
              <p className="text-gray-600">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
