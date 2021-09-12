import { GET_PRODUCTS_SUCCESS } from "../constants"

const productsReducer = (state = [
  {
    _id: 1,
    category: 'test',
    name: 'testProduct1',
    price: 21,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    reviews: []
  },
  {
    _id: 2,
    category: 'test',
    name: 'testProduct2',
    price: 21,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    reviews: []
  },
  {
    _id: 3,
    category: 'test',
    name: 'testProduct3',
    price: 21,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    reviews: []
  }
], action) => {
  switch(action.type) {
    case GET_PRODUCTS_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default productsReducer