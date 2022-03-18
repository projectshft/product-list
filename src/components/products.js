import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { fetchProducts } from '../actions';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  function renderProducts() {
    return products.map((product) => (
      <div className="col-md-4 pb-4" key={product.id}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>Category: {product.category}</Card.Text>
            <Card.Text>${product.price}</Card.Text>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/250?text=Product+Image"
            />
            <Card.Title>{product.name}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  return (
    <div className="container">
      <div className="row">{renderProducts()}</div>
    </div>
  );
};

export default Products;
