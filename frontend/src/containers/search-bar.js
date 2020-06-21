import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { categorySort } from '../actions/index';
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
  }

  onInputChange(event) {
    console.log(this.state)
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    
    this.props.fetchProducts(this.state.term);//fetch products with search query
    this.setState({ term: ''});
    // console.log(this.props.fetchProducts(this.state.term))
    // console.log("inside fetch props " + this.props)
  }

  handleSelect(event){
    
    // this.setState({ category: event });
    this.props.categorySort(event);
    console.log(this.props.categorySort(event))
  }

  renderProducts() {
    
    console.log(this.props.products[0])
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


  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={this.onFormSubmit} className="input-group">
                  <input
                  placeholder="Search Products"
                  className="form-control"
                  value={this.state.term}
                  onChange={this.onInputChange}
                  />
                  <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button>
                  </span>
              </form>
            </div>

            <div>
              <div className="App container">
        
                <DropdownButton
                alignRight
                title="Dropdown right"
                id="dropdown-menu-align-right"
                onSelect={this.handleSelect}
                  >
                        <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
                        <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
                        <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
                </DropdownButton>
                
              </div>
            </div>

            <div className="row">
                {this.renderProducts()}
            </div>
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
  return bindActionCreators({ fetchProducts, categorySort }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
