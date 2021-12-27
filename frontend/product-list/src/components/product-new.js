import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../actions';
import {Form, Row, Col, Card, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NewProduct = (props) => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        name,
        category: category[0].toUpperCase() + category.substring(1),
        price,
        image,
      }, () => {
        props.history.push('/products');
      })
    );
  };

  return (
    <>
        <br />
        <Row>
          <Col xs={{span:8, offset:2}}>
            <Card>
              <Container>
                <br />
                <h3>Post a New Product</h3>
                <br />
                <Form onSubmit={handleSubmitClick}>
              
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="name"
                     onChange={event => setName(event.target.value)}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Category</Form.Label>
                    <Form.Control required type="name"
                     onChange={event => setCategory(event.target.value)}
                      />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control required type="number"
                     onChange={event => setPrice(event.target.value)}
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control required type="url" placeholder="Must be URL"
                     onChange={event => setImage(event.target.value)}
                     />
                  </Form.Group>
                  
                  <div className="d-grid gap-2" style={{marginBottom:"10px"}}>
                    <Button variant="primary" size="lg"
                      type="submit"
                      >
                      Submit
                    </Button>
                  </div>

                  <Link to={'/products'} style={{textDecoration:"none"}}>
                    <div className="d-grid gap-2">
                      <Button variant="secondary" size="lg">
                        <strong>Cancel</strong>
                      </Button>
                    </div>
                  </Link>
                  <br  />

                </Form>
              </Container>
            </Card>
          </Col>
        </Row>
    </>
  )

}

export default NewProduct;