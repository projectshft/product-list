import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

import { fetchProducts, searchProducts } from '../actions';

const ProductsIndex = () => {
  let products = useSelector((state) => state.products.products);
  let page = useSelector((state) => state.products.pageSelected);
  let category = useSelector((state) => state.products.categorySelected);
  let sort = useSelector((state) => state.products.sortSelected);
  let query = useSelector((state) => state.products.query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, category, sort, query));
  }, [page, category, sort, query, dispatch]);

  function renderProducts() {
    if (products.length > 0) {
      return products.map((product) => (
        <li className="list-group-item" key = {product._id}>
          {product.name}
        </li>
      ));
    }
    return (
    <>
      <Card>
        <Card.Body className="text-center">
          Sorry, we couldn't find any products matching "{query}". <br />
          Please try again.
        </Card.Body>
        <Button
            variant="secondary"  
            onClick={() => {
              dispatch(searchProducts({query: ' '}));
            }
            }
          >
          Back
        </Button>

      </Card>
    </>
    )
  }

  return (
    <div>
      <div className="text-xs-right">
      </div>
      <br />
      <h6 className="text-right"> Sort by</h6>
      <ul className="list-group">{renderProducts()}</ul>    
    </div>
  );
};

export default ProductsIndex;