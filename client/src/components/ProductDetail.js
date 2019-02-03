import { Link } from 'react-router-dom'
import React from "react";


const ProductDetail = ({props, Products}) => {
  const {id} = props.match.params;
  console.log(id)
  const product = Products.find(product => Number(product.id) === Number(id))
  console.log(product)

  if (!product) {
    return <div>Sorry But the product was not found<Link to='/'> Back</Link></div>;   
  } 

  return (
      <div className="details">
 
        <h1>Name: {product.name}</h1>    
        <h2>Category: {product.category}</h2>
        
        <h3>Price: {product.price}</h3>  
        <Link to='/'>Main Page</Link>
      </div>

  )
};


export default ProductDetail;