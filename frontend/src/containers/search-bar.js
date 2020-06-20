import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import _ from "lodash";


//Search bar component is a container component as it will
//have to talk with our state in order to kick off requests to the Open Weather API and populate our store with data
class SearchBar extends Component {
  constructor(props) {//the props are an objects that contains fetch weather function
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(this.state)
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    
    this.props.fetchProducts(this.state.term);
    this.setState({ term: '' });
    // console.log(this.props.fetchProducts(this.state.term))
    // console.log("inside fetch props " + this.props)
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
        <div>
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                placeholder="Search Products"
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary">
                    Submit
                </button>
                </span>
            </form>

            <div className="row">
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
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
