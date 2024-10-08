// src/pages/ProductPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import { fetchProduct, fetchReviews, } from '../services/api'; // Adjusted imports
import useProductId from '../hooks/useProductId';


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { setProductId } = useProductId();


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        
        const productData = await fetchProduct(id);
        setProduct(productData);
        setProductId(productData._id);
        
        const reviewsData = await fetchReviews(id);
        console.log('Fetching reviews for product ID:', id);

        setReviews(reviewsData || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setProductId]);

  const addReview = (newReview) => {
    setReviews((prevReviews) => {
      // Check if the new review already exists in the current reviews
      const isDuplicate = prevReviews.some(
        (review) => review.user === newReview.user && review.review === newReview.review
      );
      // If not duplicate, add the new review
      return isDuplicate ? prevReviews : [...prevReviews, newReview];
    });
  };
  const handleDelete = (reviewId) => {
    setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
  };

  if (loading) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      
      <h2>Reviews</h2>
      <ReviewList reviews={reviews}  productId={id} onDelete={handleDelete} />

      <ReviewForm  onReviewAdded={addReview} />
    </div>
  );
};

export default ProductPage;
