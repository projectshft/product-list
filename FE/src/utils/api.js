import axios from 'axios';

export const fetchProductsApi = async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductApi = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
