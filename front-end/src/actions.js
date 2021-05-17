import axios from 'axios'


export const GET_PRODUCTS = "GET_PRODUCT"



export const getProducts =  (pageNumber) => {

  return axios.get(`http://localhost:5000/products?page=${pageNumber}`)
    .then(res => {
      return {
        type: GET_PRODUCTS,
        payload: res
      }
    })
}


// export const productAction = async (query) => {

//   const responseProducts =  await axios.get(`http://localhost:5000/products${query}`);
 
//   return {
//     type: GET_PRODUCTS,
//     payload: responseProducts
//   }
//  }

//`http://localhost:5000/products?page=${pageNumber}&name=${name}&category=${category}&sort=${priceType}`