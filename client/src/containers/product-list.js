import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {fetchProducts} from "../actions";

class ProductList extends Component {

  constructor(props){
    super(props)

  }
  
  componentDidMount() {
    //console.log(fetchProducts());
    this.props.fetchProducts();
  }

  renderList() {
    const {products} = this.props
    console.log(products);
    return products.map((product) => {
      return (
        <div key={product.name} className="list-group col-sm-4 col-md-4 col-lg-4">
        <li className="list-group-item col-sm-10 col-md-10 col-lg-10">{product.name}</li>
        <li className="list-group-item col-sm-10 col-md-10 col-lg-10"><img src={product.image} /></li>
        <li className="list-group-item col-sm-10 col-md-10 col-lg-10">{product.category}</li>
        <li className="list-group-item col-sm-10 col-md-10 col-lg-10">$ {product.price}</li>  
        </div>
      )
    })
  }

  render() {
    return (
      <ul className="List-group col-sm-12">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps({products}) {
  //whatever is returned will show up as props inside of ProductList
  console.log("state in mapstatetoprops in the product list component", {products})
  return {products};
}

//Anything returned from this function will end up as props on the ProductList container
const mapDispatchToProps = (dispatch) => {
  //whenever fetchProducts is called the result should be passed to all of our reducers
  return bindActionCreators({fetchProducts}, dispatch);
}

//Promote ProductList from a component to a container - it needs to know about this new dispatch method, selectBook.  Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)