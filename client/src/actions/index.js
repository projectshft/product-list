import * as api from '../api/index'


export const createProduct = (product) => async (dispatch) => {
  const { data } = await api.createProduct(product);
  dispatch({ type: 'PRODUCT', payload: data });
  }


export const getProducts = () => async (dispatch) => {
  const {data} = await api.getProducts();
  dispatch({ type: 'GET', payload: data})
    }

export const deletePost = (id) => async (dispatch) => {
  const { data } = await api.deletePost(id);
  dispatch({ type: 'DELETE', payload: data });
   }
