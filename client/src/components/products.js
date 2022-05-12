import { Card, Row, Col, Container } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { productSearch } from "../actions";
import React, {useEffect} from "react";



const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productSearch("","",""));
  }, [dispatch] )

  let products = useSelector((state) => state.products)
  console.log(products);
  let data = [];

  const renderProducts = () => {
    if(products === []) {
      return <p className="fs-1">No products found!</p>
    } else {
      for (let i = 0; i < products.length; i++) {
        data.push (
          <Card style={{ width: '21rem', height: 'auto' }} className='m-3' key={i}>
            <Card.Body >
                <Row>
                  <Col xs={5}>
                  <p className="font-weight-light">Category = <strong>{products[i].category}</strong></p>
                  </Col>
                  <Col>
                  <p className="text-end">${products[i].price}</p>
                  </Col>
                </Row>
                <Row>
                  <img alt='...' src={products[i].image} />
                </Row>
                <Row>
                  <Col>
                    <p className="fs-2">{products[i].name}</p>
                  </Col>
                </Row>
            </Card.Body>
          </Card>
        )
      };
      return data;
    };
  };
  return (
    <Container>
      <Row className='pt-4 w-80 mx-auto'>
        {renderProducts()}
      </Row>
    </Container>
  )
}

export default Products