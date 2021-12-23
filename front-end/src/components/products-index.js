import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton, Container, Row, Col, Card } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import _ from 'lodash';

import { fetchProducts } from '../actions';
import { fetchCategories } from '../actions';

const ProductsIndex = () => {    
    let products = useSelector(state => state.products)
    let pageNumber = 1;
    let [category, setCategory] = useState("");
    let [query, setQuery] = useState("");
    let [sorting, setSorting] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts(pageNumber, category, query, sorting));
    }, [dispatch, fetchProducts, pageNumber, category, query, sorting])    
    
    
    function renderProducts() {
        console.log(products)
        console.log(category)
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
                        onChange={event => setQuery(event.target.value)}
                        name='Product Input'></input></Col>
                        <Col>
                        <DropdownButton title="Categories">                     
                            <Dropdown.Item as="button" value='Home' onClick={(event)=>{setCategory(event.target.value)}}>Home</Dropdown.Item>
                            <Dropdown.Item as="button" value='Music' onClick={(event)=>{setCategory(event.target.value)}}>Music</Dropdown.Item>
                            <Dropdown.Item as="button" value='Garden' onClick={(event)=>{setCategory(event.target.value)}}>Garden</Dropdown.Item>                     
                        </DropdownButton>  
                        </Col>
                        <Col>
                        <DropdownButton title="Sort by Price">                      
                            <Dropdown.Item as="button" value='lowest' onClick={(event)=>{setSorting(event.target.value)}}>Lowest to Highest</Dropdown.Item>
                            <Dropdown.Item as="button" value='highest' onClick={(event)=>{setSorting(event.target.value)}}>Highest to Lowest</Dropdown.Item>                              
                        </DropdownButton>  
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