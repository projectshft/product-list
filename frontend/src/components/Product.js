import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { getProductById } from '../actions/actions';

const Product = (document) => {
  const dispatch = useDispatch()
  const clickHandler = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    
  }

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