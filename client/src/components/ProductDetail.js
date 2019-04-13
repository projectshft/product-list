import React from 'react'
import { connect } from 'react-redux';

const ProductDetail = (props) => {
  let products;
  if (props) {
    // products = props.products.map((item) => {
    //   return (
    //     <div className="col-sm-4" key={item._id}>
    //       <p>Category: {item.category}</p>
    //       <img src={item.image} alt="" className="product-img" />
    //       <h3>{item.name}</h3>
    //     </div >
    //   )
    // })
  }

  return (
    <>
      {products}
    </>
  )
}

const mapStateToProps = (state) => {
  return { products: state.products[0] }
};

export default connect(mapStateToProps)(ProductDetail);