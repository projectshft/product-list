import axios from "axios";
export const SEARCH = 'SEARCH';

export const firstSearch = async () =>{
  const currentQuery = {};
  const productData = await axios.get('http://localhost:8000/products');
  currentQuery.items = productData.data.products;
  currentQuery.count= productData.data.count;

  return {
    type: SEARCH,
    payload: currentQuery
  }
}; 

export const search = async (page, category, queryString, priceSort) =>{
  
  const currentQuery = {};
  currentQuery.page = page || 1;
  currentQuery.category = category || null;
  currentQuery.queryString = queryString || null;
  currentQuery.priceSort = priceSort || null;

  let url = 'http://localhost:8000/products?';

  if (currentQuery.category) {
    url += `category=${currentQuery.category}&`
  }

  if (currentQuery.page) {
    url+= `page=${currentQuery.page}&`
  }

  if (currentQuery.priceSort){
    url+=`price=${currentQuery.priceSort}&`
  }

  if(currentQuery.queryString){
    url+=`query=${queryString}`
  }

  const productData = await axios.get(url);

  currentQuery.items = productData.data.products;
  currentQuery.count= productData.data.count;

  return {
    type: SEARCH,
    payload: currentQuery
  }
};