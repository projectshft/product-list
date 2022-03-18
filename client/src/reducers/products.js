 const productReducer= (products=[], action) => {
  switch (action.type) {
    case 'POST':
    return [...products, action.payload];
    case 'GET':
    return action.payload;
    // case 'UPDATE':
    // return products.map(product => product._id === action.payload._id ?   action.payload : post);
    case 'DELETE':
    return products.filter(product => product._id !== action.payload);
    default:
    return products;
    }
  }



export default productReducer;