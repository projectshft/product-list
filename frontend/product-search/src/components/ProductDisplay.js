import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';

const ProductDisplay = () => {
  const productList = useSelector((state) => state.products.productList);
  const page = useSelector((state) => state.products.currPage);
  const query = useSelector((state) => state.products.currQuery);
  const category = useSelector((state) => state.products.currCategory);
  const sort = useSelector((state) => state.products.currSort);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, query, category, sort));
  }, [page, query, category, sort, dispatch]);

  return (
    <div className="container">
      <div className='row'>
        <div>
          {productList.length === 0 ?
            <div><h3>There are no products that match your search criteria</h3></div> :
            (productList.map((product, index) => (
              <div className='col-md-3 product' key={index}>
                <p>Category: <strong>{product.category}</strong></p>
                <h3>Price: <strong>{product.price}</strong></h3>
                <img src="https://via.placeholder.com/250?text=Product+Image" alt=""></img>
                <h2><strong>{product.name}</strong></h2>
              </div>
            )))}
        </div>
      </div>
    </div>
  )
};

export default ProductDisplay;