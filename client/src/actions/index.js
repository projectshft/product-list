export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const url = `http://localhost:8000/products`;

export const fetchProducts = async query => {
  const request = await fetch(url + (query ? query : ''));
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
