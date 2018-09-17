import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {fetchProducts} from "../actions";

class ProductList extends Component {
  constructor(props){
    super(props);
    // debugger
    this.state = {
      products: []
    }
    
    this.props.fetchProducts();
  }
  
  //when the component gets added to the dom
  //get all the products
  // componentWillMount() {
  //   console.log(this.props.fetchProducts());
  //   this.props.fetchProducts()
  // }

  renderList() {
    console.log(this.props.products);
    return this.props.products.map((product) => {
      console.log(this.props.products);
      return (
        <li key={product.name} className="list-group-item">{product.name}</li>
      )
    })
  }

  render() {
    return (
      <ul className="List-group col-sm-4">
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