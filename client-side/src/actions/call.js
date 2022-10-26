import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



export const call = (res) => {
  axios.get('http://localhost:8000/api/products')
  .then(console.log('res'));
}
