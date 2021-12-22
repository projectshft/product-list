import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Container, Row, Col, Card } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import _ from 'lodash';

import { fetchProducts } from '../actions';
import { fetchCategories } from '../actions';

const ProductsIndex = () => {    
    const products = useSelector(state => state.products)
    const [product, setProduct] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, fetchProducts])    
    
    
    function renderProducts() {
        console.log(products)
        console.log(product)
        return (
            <div> 
                <Row md={3}>
                {products.map((product) => 
                    <Col>
                    <Card style={{ width: '18rem' }}>                        
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Subtitle>Price: {product.price}</Card.Subtitle>
                            <Card.Text>Category: {product.category}</Card.Text>                            
                        </Card.Body>
                        <Card.Img variant="top" src={product.image} />
                    </Card>  
                    </Col>         
                )}                
                </Row>
            </div>
        )
}

    return (
        <div>
            <div>
                <Container>
                    <Row>
                        <Col><input
                        onChange={event => setProduct(event.target.value)}
                        name='Product Input'></input></Col>
                        <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort by Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Home</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Music</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Garden</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>  
                        </Col>
                        <Col>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort by Price
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Lowest to Highest</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Highest to Lowest</Dropdown.Item>                      
                            </Dropdown.Menu>
                        </Dropdown>  
                        </Col>
                    </Row>
                </Container> 
            </div>
            <div>
                {renderProducts()}
            </div>
            
            </div>  
            
    )

}

export default ProductsIndex;