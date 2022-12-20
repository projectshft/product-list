import axios from 'axios';

export async function fetchProducts (page, sort, category, item) {
    console.log('fetchproducts', page, sort, category, item)
try{
    const params = {
        page,
        sort,
        category,
        item
    }
    const products = await axios.get('http://localhost:8000/products', { params })
    return products;
}
catch(e){
    console.error('error in fetching product data', e)
    throw e;
}

}