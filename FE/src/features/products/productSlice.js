import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProduct, addReview, fetchReviews, deleteReview } from '../../services/api';


// Async thunk for fetching a product
export const fetchProductAsync = createAsyncThunk(
  'products/fetchProduct',
  async (productId) => {
    const response = await fetchProduct(productId);
    return response;
  }
);

// Async thunk for adding a review
export const addReviewAsync = createAsyncThunk(
  'reviews/addReview',
  async ({ productId, reviewData }) => {
    const response = await addReview(productId, reviewData);
    return response;
  }
);

// Async thunk for fetching reviews
export const fetchReviewsAsync = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ productId, page }) => {
    const response = await fetchReviews(productId, page);
    return response;
  }
);

// Async thunk for deleting a review
export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const response = await deleteReview(reviewId);
    return response;
  }
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    product: null,
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchReviewsAsync.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.push(action.payload); // Assuming the added review should be added to the state
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload.id);
      });
  },
});

// Export actions and reducer
export default productSlice.reducer;
