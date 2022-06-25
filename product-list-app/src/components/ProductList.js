import { useSelector } from 'react-redux';
import Product from './Product';
import './ProductList.css';

const displayProducts = productArr => {
    if(productArr.length > 0) {
        return productArr.map(product => <span>{product.name}</span>)
    }
}

const ProductList = () => {
    const products = useSelector(products => products);
    return (
        <div className="ProductList">
            <h1>Product List</h1>
            {displayProducts(products)}
            <Product />
        </div>
    )
};

export default ProductList;