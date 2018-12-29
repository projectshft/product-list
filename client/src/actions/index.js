export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = async (query = {}) => {
  let url = `http://localhost:8000/products`;
  // User has not supplied any query filters
  let userQuery = false;

  for (let key in query) {
    if (userQuery) {
      // User has supplied previous filters
      url += `&${key}=${query[key]}`;
    } else {
      // New user filters
      url += `?${key}=${query[key]}`;
      userQuery = true;
    }
  }

  const request = await fetch(url);
  const { docs: products, total, pages, page, limit } = await request.json();
  return {
    type: FETCH_PRODUCTS,
    products,
    total,
    pages,
    page,
    limit
  };
};
