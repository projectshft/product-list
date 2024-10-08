import React, { useState } from 'react';
import { addReview } from '../services/api';
import useProductId from '../hooks/useProductId';

const ReviewForm = ({ productId: propProductId,reviews, onReviewAdded }) => {
  const { productId: hookProductId } = useProductId();
  const productId = propProductId || hookProductId; 
  console.log(hookProductId, 'productId');
  const [newReview, setNewReview] = useState({ user: '', rating: '', review: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Prevent double submission
      if (isSubmitting) return; 
      setIsSubmitting(true);

    console.log("Submitting review with data:", newReview); // Log review data
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Simple validation
    if (!newReview.user || !newReview.rating || !newReview.review) {
        setError('All fields are required.');
        setLoading(false);
        return;
    }

    try {
        const reviewData = {
             // Add productId to the review data
            user: newReview.user,
            rating: Number(newReview.rating), // Ensure rating is a number
            review: newReview.review,
            productId: productId
        };

        // Call the API to add the review with the complete reviewData
        const addedReview = await addReview(productId, reviewData);
        
        // Call the onReviewAdded callback to update the reviews list
        onReviewAdded(addedReview); 

        // Clear the form after submission
        setNewReview({ user: '', rating: '', review: '' });
        setSuccessMessage('Review added successfully!');
    } catch (error) {
        console.error('Error adding review:', error);
        setError('Failed to add review. Please try again.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <h2>Add a Review</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="User"
          value={newReview.user}
          onChange={handleInputChange}
          required // Adding required attribute for HTML validation
        />
        <select
          name="rating"
          value={newReview.rating}
          onChange={handleInputChange}
          required
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <textarea
          name="review"
          placeholder="Review"
          value={newReview.review}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
