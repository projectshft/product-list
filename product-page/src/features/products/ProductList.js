import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from './productSlice'
import './ProductList.css'

const ProductList = () => {
    // Initialize the Redux dispatch function
    const dispatch = useDispatch()

    // Retrieve data from the Redux store
    const { products, totalPages, currentPage } = useSelector(
        (state) => state.products
    )

    // Dispatch the fetchProducts action when the component mounts or when currentPage changes
    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage }))
    }, [dispatch, currentPage])

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-grid">
                {/* Loop through products array and display each product */}
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>

                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {/* Generate pagination links for each page */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index + 1}
                        // Highlight the active page
                        className={`page-number ${
                            index + 1 === currentPage ? 'active' : ''
                        }`}
                        // Create a link for each page number
                        href={`?page=${index + 1}`}
                        // Handle click event for page number link
                        onClick={(e) => {
                            e.preventDefault()
                            // Dispatch fetchProducts action with the clicked page number
                            dispatch(fetchProducts({ page: index + 1 }))
                        }}
                    >
                        {/* Display the page number */}
                        {index + 1}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default ProductList
