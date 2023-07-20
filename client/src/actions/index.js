import axios from "axios";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
const ROOT_URL = `http://localhost:9000`;

export function fetchProduct(item, sortOption, typeOfItem, pages) {
  const allProducts = axios.get(`${ROOT_URL}/products`);

  if (item) {
    allProducts.then((response) => {
      //find the item by name, then return the id to url to fetch the item from API
      const foundItem = Object.values(response.data).find((product) => {
        debugger;
        return product.name.toLowerCase() === item.toLowerCase();
      });

      if (foundItem) {
        debugger;
        const itemId = foundItem._id;
        const url = `${ROOT_URL}/products/${itemId}`;
        const request = axios.get(url);

        return {
          type: FETCH_PRODUCT,
          payload: request,
        };
      }
    });
  } else if (!item || sortOption || typeOfItem) {
    const productWithFilter = axios.get(`${ROOT_URL}/products`, {
      params: {
        price: sortOption,
        category: typeOfItem,
        page: pages,
      },
    });

    const request = productWithFilter;
    return {
      type: FETCH_PRODUCT,
      payload: request,
    };
  }
}
