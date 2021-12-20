import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchProducts } from '../actions';

const ProductsIndex = () => {
  let products = useSelector((state) => state.products.products);
  let page = useSelector((state) => state.products.pageSelected);
  let category = useSelector((state) => state.products.categorySelected);
  let sort = useSelector((state) => state.products.sortSelected);
  let query = useSelector((state) => state.products.query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, category, sort, query));
  }, [fetchProducts]);

  function renderProducts() {
    console.log(products);
    if (products.length > 0) {
      return products.map((product) => (
        <li className="list-group-item" key = {product._id}>
          {product.name}
        </li>
      ));
    }
    return <div>No products to show</div>;
  }

  return (
    <div>
      <div className="text-xs-right">
      </div>
      <br />
      <h3>Products</h3>
      <ul className="list-group">{renderProducts()}</ul>    
    </div>
  );
};

export default ProductsIndex;