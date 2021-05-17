import { FETCH_PRODUCTS } from "../actions";

const defaultState = {
  products: [
    {
      "reviews": [],
      "_id": "609b1ba6e43bd134acb73bee",
      "category": "Music",
      "name": "Fantastic Cotton Salad",
      "price": 982,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    },
    {
      "reviews": [],
      "_id": "609b1ba6e43bd134acb73c08",
      "category": "Music",
      "name": "Awesome Plastic Bike",
      "price": 801,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    },
    {
      "reviews": [],
      "_id": "609b1ba6e43bd134acb73c14",
      "category": "Music",
      "name": "Incredible Fresh Bike",
      "price": 298,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    },
    {
      "reviews": [],
      "_id": "609b1ba6e43bd134acb73c15",
      "category": "Music",
      "name": "Intelligent Steel Computer",
      "price": 63,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    },
    {
      "reviews": [],
      "_id": "609b1ba6e43bd134acb73c31",
      "category": "Music",
      "name": "Licensed Rubber Computer",
      "price": 352,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    },
    {
      "reviews": [],
      "_id": "609bd4bfaa762a433a13edcd",
      "category": "Music",
      "name": "tra la la",
      "price": 100000,
      "image": "https://via.placeholder.com/250?text=Product+Image",
      "__v": 0
    }]
}

const cleanProducts = (products) => {
  return {
    products: products.products.map(function (p) {
      return {
        id: p._id || '',
        name: p.name || '',
        category: p.category || '',
        price: p.price || '',
        image: p.image || ''
      }
    })
  };
}

const productsReducer = function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return cleanProducts(action.payload);

    default: return cleanProducts(state);
  }
}

export default productsReducer;