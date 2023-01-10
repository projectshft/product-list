
export const GET_PRODUCTS = 'GET_PRODUCTS';



export function getProducts(productData) {
    return{
        type: GET_PRODUCTS,
        payload: productData,
    }
}