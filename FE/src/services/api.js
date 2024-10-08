// src/services/api.js

const API_URL = 'http://localhost:5000/api/products';
const API_URLr = 'http://localhost:5000/api/reviews'

export const fetchProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const fetchReviews = async (productId) => {
  const response = await fetch(`${API_URLr}/${productId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const addReview = async (productId, reviewData) => {
  // Ensure rating is a number
  const dataToSend = {
      ...reviewData,
      productId: productId, // This adds the productId to the object
      rating: Number(reviewData.rating), // Ensure rating is a number
  };

  const response = await fetch(`${API_URLr}/${productId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend), // Send the complete object
  });

  if (!response.ok) {
      throw new Error('Failed to add review');
  }

  return await response.json(); // Returns the newly added review
};



export const deleteReview = async ( reviewId) => {
  try{
  const response = await fetch(`${API_URLr}/${reviewId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data; // Return the response from the delete operation
} catch (error) {
  console.error('Error deleting review:', error);
  throw error; // Propagate the error for further handling
}
};
