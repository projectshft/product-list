import React from 'react'
import Card from 'react-bootstrap/Card';

const Product = (document) => {

  const doc = document.doc
  
  return (
    <Card className="product-card" key={doc._id} >
      <Card.Img src={doc.image}></Card.Img>
      <Card.Body>
        <Card.Title>{doc.name}</Card.Title>
        <Card.Text><em>Category: </em>{doc.category}</Card.Text>
        <Card.Text>${doc.price}</Card.Text>
      </Card.Body>
      
    </Card>
  )
}

export default Product