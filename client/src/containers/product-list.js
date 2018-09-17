import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import {fetchProducts} from "../actions";
import {fetchProducts} from "../actions";

class ProductList extends Component {
 
  
  //when the component gets added to the dom
  //get all the products
  componentDidMount() {
    
    this.props.fetchProducts();
  }

 
  renderProductList(){
    console.log("render is recieiving these props: ", this.props.products);
    
    //take the products fectched and map them into formatted product items
    return this.props.products.map(product => {
      return (
        <div className='col-sm-4 col-lg-4 col-md-4 product-list' key={product._id} product={product}>
          <div className="thumbnail ">
            <img
              className="img-thumbnail"
              src={product.image}
              alt={product.name}
            />
            <div className="caption">
              <h3> {product.name} </h3>
              <h4>{product.category}</h4>
              <h4 className="pull-right"> {product.price} </h4>
            </div>
          </div>
        </div>
      );

      })
    
    }
  


      //return each formatted product items in a html element 
      //this should be formatted more
      //should the key go here or above?
      // return (

      //   <div>
      //   {products}
      //   </div>

      // ); 

  
  //instructs how to insert this in the dom
  render() 
  {
    return (
      <div className="container">
        <div className="flex-row row">
          ProductList

          {this.renderProductList()}
        </div>
      </div>
    )
  }
};

// render() {
//   const {products} = this.props;
//   console.log('products props: ', products);
//   return (
//     <div className="products row" >
//       {products.map((product, index) => this.renderProductList(product, index))}
//     </div>
//   )
// }


//map the redux state to this components props.
//taking the redux state and passing it down to this components props
function mapStateToProps (state) {
  console.log("product list info", state);
  return { products: state.products};
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);