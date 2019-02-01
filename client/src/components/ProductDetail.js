import { Link } from 'react-router-dom'
import React from "react";


const ProductDetail = ({props, Products}) => {
  const {name} = props.match.params;
  const product = Products.find(p => p.name === name)

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