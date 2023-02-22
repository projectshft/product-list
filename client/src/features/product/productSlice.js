import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/myProducts';


export const GET_PRODUCTS_DATA_REQUEST = 'GET_PRODUCTS_DATA_REQUEST'
export const GET_PRODUCTS_DATA_SUCCESS = 'GET_PRODUCTS_DATA_SUCCESS'
export const GET_PRODUCTS_DATA_FAILURE = 'GET_PRODUCTS_DATA_FAILURE'

const initialState = {
  data: [],
};



export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    GET_PRODUCTS_DATA_REQUEST (state, action) {
      return {
        ...state, 
        loading: true,
        error: null,
      }
    },
      GET_PRODUCTS_DATA_SUCCESS (state, action) {
        return {
          loading: false,
          data: [...state.data, action.payload],
      }
    },
      GET_PRODUCTS_DATA_FAILURE (state, action) {
        return {
          ...state,
          loading: false,
          error: '',
          data: [],
        }
      }
     }
    });

    var params = new URLSearchParams();
    params.append("productName", null);
    params.append("category", null);
    params.append("price", null);
    params.append("page", null);

    console.log(params)
   
    export const fetchProductData = (categoryQuery, productQuery, priceQuery, pageQuery) => async (dispatch, getState) => {
      dispatch({ type: 'GET_PRODUCTS_DATA_REQUEST'})
      try {
        const response = await axios.get(
          `${API_URL}?name={productQuery}&category={categoryQuery}&price={priceQuery}&page={pageQuery}`
        );
        dispatch({ type: 'GET_PRODUCTS_DATA_SUCCESS', payload: {category: categoryQuery, name: productQuery, price: priceQuery, page: pageQuery, products: response.data}})
      } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_DATA_FAILURE', payload: error })
        alert('No data found')
      };
    };
    

  
  export const showProducts = (state) => state.response.data;
  export const selectProductById = (state, productId) => 
  state.products.find(product => product.id === productId)
  export default productSlice.reducer

// // const initialState = {
// //   products: [],   //where are these coming from if not hardcoded???
// //   queryProductName: null,
// //   queryCategory: null,
// //   queryPrice: null,
// //   queryPage: null || 1,
// //   status: 'idle',
// //   error: null,

// //   // queryCategory: null,   //these will come from store and capturing value on button click or whatever
// //   // queryPrice: null,
// //   // queryPage: null,
// //   // status: 'idle',
// //   // error: null,
// //}

  
  
//   //A slice is the portion of Redux code that relates to 
//   //a specific set of data and actions within the store 's state. 
//   //A slice reducer is the reducer responsible for 
//   //handling actions and updating the data for a given slice. 
//   //This allows for smaller reducer functions that focus on a slice of state.

//   //Reducers are the most important Redux concept. 
//   //A typical reducer function needs to: Look at the type field 
//   //of the action object to see how it should respond. 
//   //Update its state immutably, by making copies of the parts of the state that need to change 
//   //and only modifying those copies.
//   // export const productSlice = createSlice({
//   //   name: 'products',
//   //   initialState,     
//   //   reducers: {
      
//   //       }
//   //     }

// //       loadProducts: (state, action) =>{
// //         switch(action.type) {
          
// //         }
// //       },
// //       loadQueries: (state, action) => {
// //         const { id, queryProductName, queryCategory, queryPrice, queryPage } = action.payload
// //         const existingProducts = state.products.find(products => products.id === id)
// //         if (existingProducts) {
// //           existingProducts.productName = queryProductName
// //           existingProducts.category = queryCategory
// //           existingProducts.price = queryPrice
// //           existingProducts.page = queryPage
// //         } else if (!existingProducts) {
// //           state.error = action.payload;
// //         }
// //       },
// //     }
// // });     
      
// // export const {loadProducts, loadQueries } = productSlice.actions;

// // export default productSlice.reducer;

// // export const selectAllProducts = state => state.products;

























// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import products from '../../products';


// // const QUERY_URL = 'http://localhost:8000/myProducts?';
// // const categoryPath = 'category=Shoes/';
// // const productPath = 'name=Sausages';
// // const priceSortPath = 'price=Lowest';
// // const pageSortPath = 'page=Next';


 

// //   export const fetchProductByName = createAsyncThunk('myProducts/fetchAllProducts',           
// //   async () => {
// //     return axios
// //     .get('http://localhost:8000/myProducts')
// //     .then((response) => response.data.map((product) => product.id))
// //   })  

// // export const fetchProduct = createAsyncThunk(
// //   'myProducts/fetchProductName',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${productPath}`);
// //     return response.data;
// //   }
// // );

// // export const fetchCategory = createAsyncThunk(
// //   'myProducts/fetchCategory',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${categoryPath}`);
// //     return response.data;
// //   },
// // );

// // export const fetchPriceSort = createAsyncThunk(
// //   'myProducts/fetchPriceSort',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${priceSortPath}`);
// //     return response.data;
// //   }
// // );

// // export const fetchPageSort = createAsyncThunk(
// //   'myProducts/fetchPageSort',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${pageSortPath}`);
// //     return response.data;
// //   }
// // );

// // export const fetchProductFetchCategory = createAsyncThunk(
// //   'myProducts/fetchProductFetchCategory',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${productPath}${categoryPath}`);
// //     return response.data;
// //   }
// // );

// // export const fetchProductFetchCategoryFetchPriceSort = createAsyncThunk(
// //   'myProducts/fetchProductFetchCategoryFetchPrice',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${productPath}${categoryPath}${priceSortPath}`);
// //     return response.data;
// //   }
// // );

// // export const fetchProductFetchCategoryFetchPriceSortFetchPageSort = createAsyncThunk(
// //   'myProducts/fetchProductFetchCategoryFetchPriceSortFetchPageSort',
// //   async () => {
// //     const response = await axios.get(`${QUERY_URL}/${productPath}${categoryPath}${priceSortPath}${pageSortPath}`);
// //     return response.data;
// //   }
// // );



// // const initialState = {
//   // name,
//   // category,
//   // price
// //   products: products,
// //   currentPage: 1,
// //   status: 'idle',
// //   error: null,
// // };
 

// //   export const productsSlice = createSlice({
// //     name: 'products',
// //     initialState,     
// //     reducers: {
// //     },
// //     extraReducers: (builder) => {
// //       builder
// //       .addCase(fetchAllProducts.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchAllProducts.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.products = action.payload;
// //       })
// //       .addCase(fetchAllProducts.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //     }
// //   })
        

// //  export const selectAllProducts = (state) => state.products.products;
// //  export const getAllProductsStatus = (state) => state.products.status;
// //  export const getAllProductsError = (state) => state.products.error;

// //  export default productsSlice.reducer;



