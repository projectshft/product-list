
import axios from 'axios';

/** base url instance */
const instance = axios.create({
  baseURL: "http://localhost:8000/"
});

export default instance; 
