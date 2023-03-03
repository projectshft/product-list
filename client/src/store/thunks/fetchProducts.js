import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchProducts = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:8000/products');

  await pause(1000);
  console.log(response.data,'reponse data thunk');
  return response.data.products
});

//DEV ONLY!!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchProducts };