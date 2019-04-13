import React from 'react'
import { connect } from 'react-redux';

const ProductDetail = (props) => {
  let products;
  if (props.data) {
    console.log('data is', props.data);
    products = props.data.productsFound.map((item) => {
      return (
        <div className="col-sm-4" key={item._id}>
          <p>Category: {item.category}</p>
          <img src={item.image} alt="" className="product-img" />
          <h3>{item.name}</h3>
        </div>
      )
    })
  }

  return (
    <div className="row">
      {products}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { data: state.products.data }
};

export default connect(mapStateToProps)(ProductDetail);