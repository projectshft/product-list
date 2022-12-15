import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row } from 'react-bootstrap';

import ProductListItem from './ProductListItem';
import { fetchProducts } from '../helpers/fetchData';
import { setProducts } from '../actions';

const ProductList = () => {
  const { products } = useSelector(state => state.products)
  const {category, priceSort, query} = useSelector(state => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const { products } = await fetchProducts(category, priceSort, 1, query);
      dispatch(setProducts(products))
    }

    fetchFilteredProducts();
  }, [category, priceSort]);

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
