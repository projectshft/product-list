import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../features/productsSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'


const ProductDisplay = () => {
  const dispatch = useDispatch();
  // Access State to create query input.
  const productData = useSelector((state) => state.productStore);
  const queryInputs = useSelector((state) => state.queryInputs)
  console.log(queryInputs);
  
  // render every time queryInputs state changes
  useEffect(() => {
    dispatch(fetchProductsAction(queryInputs)
  )}, [queryInputs]);

  const products = productData.products.items;
  
  // logic to render found products
  const renderProducts = () => {
    return (products.map((product) => {
      return (
      <Col className="mb-4 col-4 md-4 d-flex align-items-stretch" key={product._id}>
        <Card className="product-card" border="dark" style={{ width: '18rem '}}>
          {product.image ? <Card.Img 
            variant="top" 
            src={`${product.image}`} 
            alt={product.name} /> : <span></span>}
          <Card.Body className="text-center">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Category: {product.category}</Card.Text>
            <Card.Text>Price: {product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      )
    }))
  };
  
  // if no products are found, render this card.
  const renderProductsNotFound = () => {
    return (
    <Card>
      <Card.Body className="text-center">
      <Card.Text><FontAwesomeIcon className="fa-5x" icon={ faUserSecret } /></Card.Text>
      <Card.Text>We were unable to find products that match your search.  Please try again.</Card.Text>
      </Card.Body>
    </Card>
    )
  }
  
    return (
      <>
       <Container className="show-products text-center m-4">
          <Row className="show-products">
          { (products?.length > 0) ? renderProducts() : renderProductsNotFound() }
          </Row>
        </Container>
      </>
    )
    
}

export default ProductDisplay
