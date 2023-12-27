import React from "react";
import { useSelector } from "react-redux";


const Result = () => {
  const cardStyle = {
    display: 'inline-block',
  }
  const products = useSelector(state => state.products);
  const printProducts = products.map(product => {
    return <div key = {product._id} className="w-25 m-2 col-4 card" style = {cardStyle}>
    <img className="card-img-top" src={product.image} alt="Product Card"/>
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text"><strong>Category</strong> {product.category}</p>
      <p className="card-text"><strong>Price</strong> {product.price}</p>
    </div>
  </div>
  })
  return <div>{printProducts}</div>
}

export default Result;