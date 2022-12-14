import { useSelector } from "react-redux";
import { Row } from 'react-bootstrap';

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
      <Row>
        {renderProductListItems()}
      </Row>
    );
  }
  return <div>Loading...</div>
  
}

export default ProductList;
