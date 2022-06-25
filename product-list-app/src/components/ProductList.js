import { useSelector } from 'react-redux';
import Product from './Product';
import './ProductList.css';

const displayProducts = productArr => {
    if(productArr.length > 0) {
        return productArr.map(product => <Product name={product.name} category={product.category} image={product.image} price={product.price}/>)
    }
}

const ProductList = () => {
    const products = useSelector(state => state.products);
    return (
        <div className="ProductList">
            {displayProducts(products)}
            <Product />
        </div>
    )
};

export default ProductList;