import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { categorySort } from '../actions/index';
import { priceSort } from '../actions/index';
import _ from "lodash";

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


//Search bar component is a container component as it will
//have to talk with our state in order to kick off requests to the Open Weather API and populate our store with data
class SearchBar extends Component {
  constructor(props) {//the props are an objects that contains fetch weather function
    super(props);

    this.state = { term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
  }

  onInputChange(event) {
    // console.log(this.state)
    this.setState({ term: event.target.value });
  }

  //on search button, fetch products function calls api with search term
  onFormSubmit(event) {
    event.preventDefault();

    
    this.props.fetchProducts(this.state.term);//fetch products with search query
    // this.setState({ term: ''});
    // console.log(this.props.fetchProducts(this.state.term))
    // console.log("inside fetch props " + this.props)
  }

 
  handlePrice(price){
    let query = this.state.term
    // console.log(price)
    this.props.priceSort(price, query);

  }

  //when category is selected in drop down menu, categorySort is called
  handleSelect(event){
    let query = this.state.term //how to add in optional search query?

    const category = event[0].toUpperCase() + event.slice(1)//uppercase first letter for api call
    this.props.categorySort(category, query);
    // console.log(category)
    // console.log(this.props)
  }



  renderProducts() {
    
    // console.log(this.props.products[0])
    // console.log(this.props.products[0].category)

    return _.map(this.props.products[0], product => {
        return (
            <div className="card" key={product._id}>
              <p><span className="category">Category: {product.category}</span>
              <span className="price">{product.price}</span>
              </p>
              <div className="image-container">
                  <img src={product.image}></img>
              </div>
            <p className="productName">{product.name}</p>
            </div>
        );
      });
  }

  // renderPages(){ //this.props.products.length wasn't working. this is to get the length of the search results
  //   let items = 0
  //   _.map(this.props.products[0], product => {
  //     items ++
  //     let pages = 9 / items
  //     console.log(pages)
  //   return <div>{pages}</div>
  //   })
    
   
  
  // }


  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <form onSubmit={this.onFormSubmit} className="input-group input-group-sm">
                  <input
                  placeholder="Search Products"
                  className="form-control"
                  value={this.state.term}
                  onChange={this.onInputChange}
                  />
                  <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary btn-sm">
                      Submit
                  </button>
                  </span>
              </form>
            </div>

            <div className="col-md-2 offset-md-2">
                <DropdownButton
                alignRight
                size="sm"
                title="Category"
                id="dropdown-menu-align-left"
                onSelect={this.handleSelect}
                  >
                        <Dropdown.Item eventKey="Automotive">Automotive</Dropdown.Item>
                        <Dropdown.Item eventKey="Baby">Baby</Dropdown.Item>
                        <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
                        <Dropdown.Item eventKey="Books">Books</Dropdown.Item>
                        <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
                        <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
                        <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
                        <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
                        <Dropdown.Item eventKey="Garden">Garden</Dropdown.Item>
                        <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
                        <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
                        <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
                        <Dropdown.Item eventKey="Jewelry">Jewelry</Dropdown.Item>
                        <Dropdown.Item eventKey="Movies">Movies</Dropdown.Item>
                        <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
                        <Dropdown.Item eventKey="Outdoors">Outdoors</Dropdown.Item>
                        <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
                        <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
                        <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
                        <Dropdown.Item eventKey="Toys">Toys</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="col-md-2 offset-md-2">
                <DropdownButton
                alignRight
                size="sm"
                title="Price"
                id="dropdown-menu-align-left"
                onSelect={this.handlePrice}
                  >
                        <Dropdown.Item eventKey="desc">Lowest</Dropdown.Item>
                        <Dropdown.Item eventKey="asc">Highest</Dropdown.Item>
                </DropdownButton>
            </div>
            </div>

            <div className="product-list row">
                {this.renderProducts()}
            </div>

          

        </div> 
        
    );
  }
}

function mapStateToProps(state) {
    // console.log('Inside mapStateToProps', state);
    // console.log(state.products)
    return { products: state.products }
}

function mapDispatchToProps(dispatch) {//this is an action creator. this is where props comes from in constructor
  return bindActionCreators({ fetchProducts, categorySort, priceSort }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
