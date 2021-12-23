import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { selectProduct, deleteReview } from '../actions';

const ProductDetail = () => {
  const dispatch = useDispatch();

  const productId = useParams();
  
  useEffect(() => {
    dispatch(selectProduct(productId.id));
  }, [selectProduct]);

  const product = useSelector((state) => state.products.productSelected);
    
  function handleDeleteReview (productId, reviewId) {
    dispatch(deleteReview(productId, reviewId));
    window.location.reload();
  }

  function renderReviews() {
    if (product.reviews) {
      return (
      <>
        {product.reviews.map(review => (
          <Card.Footer key={review._id}>
            <Row>
              <Col lg={1}>
                <Button 
                variant="outline-danger"
                onClick = {() => handleDeleteReview(product._id, review._id)}
                >
                X
                </Button>
              </Col>                  
              <Col lg={11}>
                <Card.Text className="reviews">
                  {review.reviewText} - {review.userName}
                </Card.Text>
              </Col>
            </Row>
          </Card.Footer>
        ))}
      </>
      )
    }
  }

  if (!product) {
    return (
      <h1>Product not found</h1>
    )
  }
    return (
      <Row>
        <Col lg={{span:8, offset:2}}>
          <Card style={{marginTop:"50px"}}>
            <Row>
              <Col lg={4}>
                <Card.Img src={product.image} />
              </Col>
              <Col lg={{span:8}}>
                <Card.Body>
                  <h6 className="text-muted">{product.category}</h6>
                  <h1 >{product.name}</h1>
                  <br />
                  <h1>${product.price}</h1>
                </Card.Body>
              </Col>
          </Row>
            {renderReviews()}
      </Card>
          
          <br />
          <Link to={'/products'}>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                <strong>Back</strong>
              </Button>
            </div>
          </Link>
    </Col>
          </Row>
    )

}

export default ProductDetail;