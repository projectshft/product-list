import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { getProducts } from '../actions';
import ProductListItem from './ProductListItem';
import { fetchProducts } from '../helpers/fetchProducts';
import 'bootstrap/dist/css/bootstrap.css';

const ProductList = ({page}) =>{

    const products = useSelector((state) => state.products)
    const total = useSelector((state) => state.total)
    const dispatch = useDispatch();

    const initialLoad = async () =>{
        const productData = await fetchProducts();
        dispatch(getProducts(productData))
    }

    useEffect(()=>{
        initialLoad();
    },[])


    function renderProductListItem () {
        return products.map((item)=> <ProductListItem item={item}/>)
    }

    if (products){
    return (
        <div>
        <h5 className='total-results'>Total results: {total}</h5>
        <div className="flex-container">
            <div>{renderProductListItem()}</div>
        </div>
        </div>
    )
    }
    return <div>Loading, please wait..</div>
}

export default ProductList;