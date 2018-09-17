import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchProduct } from "../actions/index"

class SearchBar extends Component {
  componentDidMount() {
    this.props.fetchProduct({
      category:"Tools",
      price:"highest"
    });
}
    constructor(props) {
        super(props);
        this.state = { term: "" };
    
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
 }
    
      onInputChange(event) {
        this.setState({ term: event.target.value });
      }
    
      onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchProduct(this.state.term);
        this.setState({ term: "" });
      }
      
    render() {
        return (
        <div>
            <h1>Products</h1>
            <span id="search">
            <form onSubmit={this.onFormSubmit} className="input-group">
              <input
                placeholder="Search Product Here"
                className="form-control"
                value={this.state.term}
                onChange={this.onInputChange}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary">Submit</button>
              </span>
            </form>
            </span>

            <span id="filter">
                <div className="dropdown">
                    <button className="dropbtn btn-secondary">
                    <font size="2">
                    Sort
                    </font>
                    </button>   
                    <div className="sort-content">
                    <a>Price: Low to High</a>
                    <a>Price: High to Low</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn btn-secondary">
                    <font size="2">
                    Categories
                    </font>
                    </button>
                    <div className="categories-content">
                    <a>Garden</a>
                    <a>Clothing</a>
                    <a>Home</a>
                    <a>Electronics</a>
                    <a>Outdoors</a>
                    </div>
                </div>
            </span>
            <br />
            <br />
            <br />
            <br />
        </div>
          );
        }
      }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProduct }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);