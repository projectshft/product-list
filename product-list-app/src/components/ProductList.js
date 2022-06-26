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
            <div className='list-container'>
                {displayProducts(products)}
            </div>
        </div>
    )
};

export default ProductList;