import axios from "axios";
import { FETCH_PRODUCTS } from "./types";

export const fetchAllProducts = () => dispatch => {
  try {
    const response = await axios.get("/products");
    dispatch({type: FETCH_PRODUCTS, payload: response.data})
  } catch (error) {
    console.error("Unable to fetch products", error)
  }
};