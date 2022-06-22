import { useSelector } from 'react-redux';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
    // const products = useSelector(state => state.products)
    return (
        <div className="ProductList">
            <h1>Product List</h1>
            <Product />
        </div>
    )
};

export default ProductList;