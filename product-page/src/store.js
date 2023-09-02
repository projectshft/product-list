import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/products/productSlice'

// Configure the Redux store
const store = configureStore({
    reducer: {
        products: productsReducer, // Use the productsReducer for the 'products' slice
    },
})

export default store
