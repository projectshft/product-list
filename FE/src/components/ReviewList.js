import { useState, useEffect } from 'react';
import { deleteReview, fetchReviews as fetchReviewsFromAPI } from '../services/api';

const ReviewList = ({  productId}) => {  // Ensure this function wraps all logic
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // To track the current page
  const reviewsPerPage = 4;  // Limit to 4 reviews per page


  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchReviewsFromAPI (productId);
        setReviews(fetchedReviews);
        console.log('Fetched reviews:', fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [productId]);
  
    
  
  // Calculate the indices for slicing the reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const Creviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  
  
  const handleDelete = async (id) => {
    try {
      await deleteReview(id); // Call your delete function
      console.log('Review deleted successfully:', id);

      // Update local state to remove the deleted review
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Map through the paginated reviews */}
      {Creviews.map((review) => (
        <div key={review._id}>
          <strong>{review.user}</strong> (Rating: {review.rating}):
          <p>{review.review}</p>
          <button onClick={() => handleDelete(review._id)}>Delete</button>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewList;
