import React from "react";
import { useSelector } from "react-redux";

const cardStyle = {
  width: "18rem",
};

const Products = () => {
  const data = useSelector(state => state.reducer.products);
  const renderProducts = () => {
    if (data.length > 0) {
      return data.map((product) => {
        return (
          <div key={product._id}className="card" style={cardStyle}>
            <div className="card-header">{product.category}</div>
            <img className="card-img" src={product.image} alt="This is the product." />
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <h4 className="card-subtitle text-muted">{product.price}</h4>
            </div>
          </div>
        )
      })
    }
  };
  

  return (
    <div className ="d-flex">
      {renderProducts()}
    </div>
  )
};

export default Products;
