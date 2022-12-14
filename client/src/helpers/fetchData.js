import axios from 'axios';

export async function fetchProducts(category, priceSort, page, limit = 9) {
  try {
    const params = {
      category,
      price: priceSort,
      page,
      limit,
    }

    const products = await axios.get('http://localhost:8000/products', { params })
    return products
  } catch(e) {
    throw e;
  }
}