import axios from "axios";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
const ROOT_URL = `http://localhost:9000`;

export function fetchProduct(item, sortOption, typeOfItem, pages) {
  //debugger;
  const allProducts = axios.get(`${ROOT_URL}/products`);

  if (item) {
    return allProducts.then((response) => {
      //find the item by name, then return the id to url to fetch the item from API
      const foundItem = Object.values(response.data).find((product) => {
        return product.name.toLowerCase() === item.toLowerCase();
      });

      if (foundItem) {
        const itemId = foundItem._id;
        const url = `${ROOT_URL}/products/${itemId}`;
        const request = axios.get(url);
        console.log("url", url); 
        console.log('req', request); 
        return {
          type: FETCH_PRODUCT,
          payload: request,
        };
      }
    });
  } else if (!item || sortOption || typeOfItem) {
    debugger; 
    const productWithFilter = axios.get(`${ROOT_URL}/products`, {
      params: {
        price: sortOption,
        category: typeOfItem,
        page: pages,
      },
    });

    if (sortOption){

    } else if(typeOfItem){

    }

    const request = productWithFilter;
    console.log('productwithfilter:', productWithFilter); 
    console.log('request:', request); 
      return {
        type: FETCH_PRODUCT,
        payload: request,
      };
  }
}
