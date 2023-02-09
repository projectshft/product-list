import { Card, Button, Col } from 'react-bootstrap';





const Product = ({id, name, category, price}) => {

  return <Card style={{ width: "18rem" }} className="child">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
        <Card.Text>
          Category: '{category}',
          Price: {price}
        </Card.Text>
        <Button variant="primary">Add To Cart</Button>
      </Card.Body>
      </Card>
   
     
}
    
      
      
      
  



export default Product;