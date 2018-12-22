import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from "reactstrap";
import {FaSearch} from 'react-icons/fa'

const Product = (props) => {
  let product = props.productItemAsProps

  return <div className="col-md-4">
      <div className="productCard" data-id={product._id}>
        <div className="product">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <img src={product.image} />
          <br/>
          <Badge><FaSearch /> {product.category}</Badge>
          <p>{product.description}</p>
          <div className="reviewBtn">
            <Link to={`/products/${product._id}`}>Reviews</Link>
          </div>
        </div>
      </div>
    </div>;
}

export default Product
