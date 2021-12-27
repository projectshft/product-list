import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Form, Container } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { selectProduct, deleteReview, addReview, deleteProduct } from '../actions';

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = useParams().id;
  const [userName, setUserName] = useState('');
  const [reviewText, setReviewText] = useState('');


  useEffect(() => {
    dispatch(selectProduct(productId));
  }, [selectProduct]);

  const product = useSelector((state) => state.products.productSelected);

  function handleDeleteReview (reviewId) {
    dispatch(deleteReview(product._id, reviewId));
    window.location.reload();
  }

  const handleDeleteProductClick = (e) => {
    e.preventDefault();
    dispatch(
      deleteProduct(
        product._id,
        () => {
          navigate('/products');
        }
      )
    );
    
  }
  
  const handleAddReview = (e) => {
    e.preventDefault();
    dispatch(
      addReview(
        product._id,
        {
        userName,
        reviewText,
        }, 
        () => {
          props.history.push('/products');
        }
      )
    );
    window.location.reload();
  };
  

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
                onClick = {() => handleDeleteReview(review._id)}
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

  function addReviewForm() {
    return (
      <Col lg={{span:10, offset:1}}>
        <br />
        <Card>
          <Container>
            <br />
            <h5>Post a Review</h5>
            <Form onSubmit={handleAddReview}>
          
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>User Name</Form.Label>
                <Form.Control required type="name"
                  onChange={event => setUserName(event.target.value)}
                  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Review</Form.Label>
                <Form.Control required type="name"
                  onChange={event => setReviewText(event.target.value)}
                  />
              </Form.Group>

              <div className="d-grid gap-2" style={{marginBottom:"10px"}}>
                <Button variant="primary" size="lg"
                  type="submit"
                  >
                  <strong>
                  Submit
                  </strong>
                </Button>
                <br />
              </div>
            </Form>
          </Container>
        </Card>
      </Col>
)
  }

  if (!product) {
    return (
      <h1>Loading...</h1>
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
            {addReviewForm()}
        <br />
      </Card>
          <br />
          <Link to={'/products'} style={{textDecoration:'none'}}>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg">
                <strong>Back</strong>
              </Button>
            </div>
          </Link>
          <br />
            <div className="d-grid gap-2">
              <Button 
              variant="danger" size="lg"
              onClick = {handleDeleteProductClick}
              >
                <strong>Delete Product</strong>
              </Button>
            </div>
          <br /> <br />
        </Col>
      </Row>
    )

}

export default ProductDetail;