import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';

const ProductDisplay = () => {
  const productList = useSelector((state) => state.products.productList);
  const query = useSelector((state) => state.products.currQuery);
  const page = useSelector((state) => state.products.currPage);
  const category = useSelector((state) => state.products.currCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(query, page, category));
  }, [query, page, category, dispatch]);

  return (
    <div className="container">
      <div className='row'>
        <div>{(
          productList.map((product, index) => (
            <div className='col-md-3 product' key={index}>
              <p>Category: <strong>{product.category}</strong></p>
              <h3>Price: <strong>{product.price}</strong></h3>
              <img src="https://via.placeholder.com/250?text=Product+Image" alt=""></img>
              <h2><strong>{product.name}</strong></h2>
            </div>
          ))
        )}</div>
      </div>
    </div>
  )
};

export default ProductDisplay;