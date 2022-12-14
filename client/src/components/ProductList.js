import { useSelector } from "react-redux";

import ProductListItem from './ProductListItem';

const ProductList = () => {
  const { products } = useSelector(state => state.products)

  const renderProductListItems = () => {
    return products.map((product, index) => {
      return <ProductListItem key={index} product={product} />
    })
  }

  if (products) {
    return (
      <div>
        {renderProductListItems()}
      </div>
    );
  }
  return <div>Loading...</div>
  
}

export default ProductList;
