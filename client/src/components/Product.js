import { Card, Button,  } from 'react-bootstrap';





const Product = ({id, image, name, category, price}) => {

  return <Card style={{ width: "18rem" }} className="child">
     <Card.Img variant="top" src="https://via.placeholder.com/250?text=Product+Image" />
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