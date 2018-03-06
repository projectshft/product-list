import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setSearchTerm, setCategoryFilter, setPriceSort, getCategories } from "../actions";

//hard-coded category values
// const defaultCategories = ["DefaultGarden", "Kids", "Industrial", "Electronics", "Games", "Health", "Books", "Computers", "Tools", "Sports", "Automotive", "Toys", "Home", "Clothing", "Music", "Beauty", "Outdoors", "Jewelery", "Movies", "Shoes", "Baby", "Furniture"] 

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  //get category list on load
  componentWillMount() {
    this.props.getCategories();
  }

  renderCategories() {
    //page may render before categories are fetched from database. use default value if not yet loaded.
    let categories = this.props.categories || [];
    return categories.map((category, index) => {
      return <option key={index} value={category}>{category}</option>
    })
  }

  onInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.setSearchTerm(this.state.searchTerm);
  }

  render() {
    return (
      <div className="container">
        <div className="row text-center m-3">
          <div className="col-md-12"><h1>PRODUCTS</h1></div>
        </div>
        <div className="row m-1 p-2 d-flex align-items-end justify-content-center border-custom">
          <div className="col">
            <form className="" onSubmit={this.onFormSubmit.bind(this)}>
              <input
                className=""
                type="text"
                value={this.state.searchTerm}
                placeholder="Enter a search term"
                onChange={this.onInputChange}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary ml-1">Search</button>
              </span>
            </form>
          </div>

          <div className="col">
            filter by category:
        <select className="form-control"
              value={this.props.params.category}
              onChange={(event) => {
                this.props.setCategoryFilter(event.target.value);
              }}>
              <option value=""></option>
              {this.renderCategories()}
            </select>
          </div>

          <div className="col">
            sort by:
          <select value={this.props.params.price} className="form-control"
              onChange={(event) => {
                this.props.setPriceSort(event.target.value)
              }}>
              <option value=""></option>
              <option value="highest">Price: High to Low</option>
              <option value="lowest">Price: Low to High</option>
            </select>
          </div>
          <button 
            type="button" 
            className="btn btn-danger float-right"
            onClick={() => {
              this.props.setSearchTerm('');
              this.props.setCategoryFilter('');
              this.props.setPriceSort('');
              this.setState({searchTerm: ''});
            }}
          
          >Reset Filters</button>
        </div>
      </div>
        )
      }
     }
    
    
function mapStateToProps(state) {
  return {
          categories: state.categories,
        params: state.params
      }
    }
    
function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearchTerm, setCategoryFilter, setPriceSort, getCategories }, dispatch);
      }
      
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
