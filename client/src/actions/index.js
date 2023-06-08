import axios from "axios";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
const ROOT_URL = `http://localhost:9000`;

export function fetchProduct(item, sortOption, typeOfItem) {
  //
  debugger; 
  const allProducts = axios.get(`${ROOT_URL}/products`, {
      params: {
        sort: sortOption,
        category: typeOfItem,
      },
  });

  if (!item && (sortOption || typeOfItem)) {
    const request1 = allProducts;

    return {
      type: FETCH_PRODUCT,
      payload: request1,
    };

  }else if(!item){
    const request2 = allProducts;

    return {
      type: FETCH_PRODUCT,
      payload: request2,
    };

  } else {
    return allProducts.then((response) => {
      const foundItem = Object.values(response.data).find((product) => {
        return product.name.toLowerCase() === item.toLowerCase();
      });

      if (foundItem) {
        const itemId = foundItem._id;
        console.log(itemId);

        const url = `${ROOT_URL}/products/${itemId}`;
        const request = axios.get(url);
        console.log("index.js url:", url);
        console.log("index.js", item);

        return {
          type: FETCH_PRODUCT,
          payload: request,
        };
      }
    });
  }
}
