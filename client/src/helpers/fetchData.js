import axios from 'axios';

export async function fetchProducts(category, priceSort, page, query, limit = 9) {
  try {
    const params = {
      category,
      price: priceSort,
      page,
      query,
      limit,
    }

    const products = await axios.get('http://localhost:8000/products', { params })
    const categories = await axios.get('http://localhost:8000/products/categories')

    return {products, categories}
  } catch(e) {
    throw e;
  }
}
