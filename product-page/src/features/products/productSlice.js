import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page }) => {
        // Fetch products data based on the page number
        const response = await fetch(
            `http://127.0.0.1:8000/products?page=${page}`
        )
        const data = await response.json()
        return data
    }
)

// Create a products slice of the Redux store
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle the fulfilled action of fetchProducts
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Update the state properties based on the API response
            state.products = action.payload.products
            state.totalPages = action.payload.totalPages
            state.currentPage = action.payload.currentPage
        })
    },
})

export default productsSlice.reducer
