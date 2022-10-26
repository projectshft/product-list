import axios from 'axios';

export const call = (res) => {
  axios.get('http://localhost:8000/products')
  .then(console.log(res.docs[0]));
}
