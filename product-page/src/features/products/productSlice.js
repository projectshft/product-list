import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// asynchronous thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', // Action name
    async ({ page, category, price, query }) => {
        let queryUrl = `http://127.0.0.1:8000/products?page=${page}` // URL to call
        // Optional additional queries
        if (category) {
            queryUrl += `&category=${category}`
        }

        if (price) {
            queryUrl += `&price=${price}`
        }

        if (query) {
            queryUrl += `&query=${query}`
        }

        // We built the query. now send it and wait for the reponse...
        const response = await fetch(queryUrl)
        const data = await response.json()
        return data // Return the fetched data
    }
)

// Create slice for Redux
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        totalPages: 1,
        currentPage: 1,
        selectedCategory: '',
        selectedPrice: '',
        selectedSearchQuery: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Update state properties with the fetched data and arguments
            state.products = action.payload.products
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
            state.selectedCategory = action.meta.arg.category
            state.selectedPrice = action.meta.arg.price
            state.selectedSearchQuery = action.meta.arg.query
        })
    },
})

export default productsSlice.reducer
