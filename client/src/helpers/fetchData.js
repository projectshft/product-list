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
    const categories = getCategoriesFromProducts(products.data.products)

    return {products, categories}
  } catch(e) {
    throw e;
  }
}

function getCategoriesFromProducts (products) {
  return products.reduce((categories, product) => {
    const category = product.category;

    if (!categories.includes(category)){
      categories.push(category)
    }
    
    return categories;
  }, [])
}