import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from './productSlice'
import './ProductList.css'

const ProductList = () => {
    const dispatch = useDispatch()
    const { products, totalPages, currentPage } = useSelector(
        (state) => state.products
    )

    // create states
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [sortingOption, setSortingOption] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        // Get the categories list
        fetchCategories()

        // fetchProducts action with the initial values
        dispatch(
            fetchProducts({
                page: currentPage,
                category: '',
                price: '',
                query: '',
            })
        )
    }, [dispatch, currentPage])

    // Get categoreis from API
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/products')
            const data = await response.json()
            const categories = data.categories

            // Update state with the categories
            setCategories(categories)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    // Event handler for category selection
    const handleCategoryChange = (event) => {
        const newCategory = event.target.value
        setSelectedCategory(newCategory)

        // fetchProducts with the selected category
        dispatch(
            fetchProducts({
                page: 1,
                category: newCategory,
                price: sortingOption,
                query: searchQuery,
            })
        )
    }

    // Event handler for sorting option selection
    const handleSortingChange = (event) => {
        const newSortingOption = event.target.value
        setSortingOption(newSortingOption)

        // fetchProducts action with the selected sorting option
        dispatch(
            fetchProducts({
                page: 1,
                category: selectedCategory,
                price: newSortingOption,
                query: searchQuery,
            })
        )
    }

    const handleSearch = () => {
        // fetchProducts with the search query
        dispatch(
            fetchProducts({
                page: 1,
                category: selectedCategory,
                price: sortingOption,
                query: searchQuery,
            })
        )
    }

    // Return the JSX content of the ProductList component
    return (
        <div className="product-list-container">
            <h2>Product List</h2>

            {/* Search input */}
            <div>
                <input
                    type="text"
                    placeholder="Search for products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Category selection dropdown */}
            <div>
                <label htmlFor="categorySelect">Select Category: </label>
                <select
                    id="categorySelect"
                    name="categorySelect"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sorting option dropdown */}
            <div>
                <label htmlFor="sortingSelect">Sort By Price: </label>
                <select
                    id="sortingSelect"
                    name="sortingSelect"
                    value={sortingOption}
                    onChange={handleSortingChange}
                >
                    <option value="">Default</option>
                    <option value="lowest">Low to High</option>
                    <option value="highest">High to Low</option>
                </select>
            </div>

            {/* product grid */}
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.category}</p>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <a
                        key={index + 1}
                        className={`page-number ${
                            index + 1 === currentPage ? 'active' : ''
                        }`}
                        href={`?page=${index + 1}`}
                        onClick={(e) => {
                            e.preventDefault()
                            // fetchProducts action with the clicked page number
                            dispatch(
                                fetchProducts({
                                    page: index + 1,
                                    category: selectedCategory,
                                    price: sortingOption,
                                    query: searchQuery,
                                })
                            )
                        }}
                    >
                        {index + 1}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default ProductList
