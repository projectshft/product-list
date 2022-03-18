import axios from 'axios';


const url = 'http://localhost:8000/products'

export const createProduct = (product) => axios.post(url, product);

export const getProducts = () => axios.get(url);

export const deleteProduct = (id) => axios.delete(`${url}/${id}`);