import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../assets/styles/global.css'; 

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    userName: ''
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting product...');
    console.log('Submitting product:', formData);

    // Ensure price is a number
    const dataToSend = { ...formData, price: Number(formData.price) };

    try {
      const response = await axios.post('http://localhost:5000/api/products', dataToSend);
      
      setMessage(`Product added successfully! Product ID: ${response.data._id}`);
      // Reset form fields after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        userName: ''
      });
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Failed to add product. Please try again.';
      console.error('Error adding product:', error);
      setMessage(errorMsg);
    }
  };

  return (
    <div className="add-product-form">
      <h1>Add New Product</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="userName" 
          value={formData.userName} 
          onChange={handleInputChange} 
          placeholder="User Name" 
          required 
        />
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          placeholder="Product Name" 
          required 
        />
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          placeholder="Description" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleInputChange} 
          placeholder="Price" 
          required 
        />
        <input 
          type="text" 
          name="category" 
          value={formData.category} 
          onChange={handleInputChange} 
          placeholder="Category" 
          required 
        />
        <input 
          type="text" 
          name="image" 
          value={formData.image} 
          onChange={handleInputChange} 
          placeholder="Image URL" 
          required 
        />
        <button type="submit">Add Product</button>
      </form>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default AddProductPage;
