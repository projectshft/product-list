import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/products';

//action
export const fetchProductsAction = createAsyncThunk("products/fetch", async(queryInput, rejectWithValue) => {
  const { keyword, name, category, price } = queryInput;
  try {
    const { data } = await axios.get(`${BASE_URL}?query=${keyword}&name=${name}&category=${category}&price=${price}`);
    console.log(data)
    return data
  } catch (error) {
    if(!error?.response){
      throw error
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  products: [],
  keyword: '',
  name: '',
  category: '',
  price: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers:{
    keywordSearch: (state, action) => {
      state.keyword = action.payload;
    },
    nameSearch: (state, action) => {
      state.name = action.payload;
    },
    categorySearch: (state, action) => {
      state.category = action.payload;
    },
    priceSort: (state, action) => {
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.products = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = undefined;
      state.error = action?.payload;
    });
  }
});

export default productsSlice.reducer
export const { keywordSearch, nameSearch, categorySearch, priceSort } = productsSlice.actions;