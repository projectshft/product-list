// import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this

// const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts() {  //search, page, category, sort
  // const request = axios.get(`${ROOT_URL}`?search=); //a promise
  // debugger;
  const request = {
    products: {
      count: 7,
      list: [
        {
          reviews: [
            '5f78ba19d0901a1054d498aa',
            '5f78ba26d0901a1054d498ac',
            '5f7a1ef350a5501d5c656255',
            '5f7a1f4d50a5501d5c656257',
            '5f7a1f6a50a5501d5c656259',
            '5f7a1ff0fb48951eac5c7eb9',
          ],
          _id: '5f77b2f2863dc51630ad4857',
          category: 'Tools',
          name: 'Refined Metal Salad',
          price: 952,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 6,
        },
        {
          reviews: [],
          _id: '5f77b2f3863dc51630ad4866',
          category: 'Tools',
          name: 'Rustic Rubber Chair',
          price: 616,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
        {
          reviews: [],
          _id: '5f77b2f3863dc51630ad48a2',
          category: 'Tools',
          name: 'Handmade Frozen Chips',
          price: 246,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
        {
          reviews: [],
          _id: '5f78ce6e2038741ec81600d7',
          category: 'Tools',
          name: 'Unbranded Soft Chair',
          price: 14,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
        {
          reviews: [],
          _id: '5f78ce6e2038741ec81600e6',
          category: 'Tools',
          name: 'Unbranded Concrete Table',
          price: 126,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
        {
          reviews: [],
          _id: '5f78ce6e2038741ec81600df',
          category: 'Tools',
          name: 'Tasty Granite Table',
          price: 687,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
        {
          reviews: [],
          _id: '5f78ce6e2038741ec8160101',
          category: 'Tools',
          name: 'Rustic Concrete Pizza',
          price: 76,
          image: 'https://via.placeholder.com/250?text=Product+Image',
          __v: 0,
        },
      ],
    },
  };

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request, //api call
  };
}