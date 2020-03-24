import React from 'react';
import { Component } from 'react';
import { fetchProducts } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SearchedCategories extends Component {

    constructor() {
        super();
        //sets the currentCategory state
        this.state = {
            category: ''
        }
        this.handleSearchedCategories = this.handleSearchedCategories.bind(this);
    }

    // handler function for the category state
    handleSearchedCategories() {
        this.props.fetchProducts(this.state.category)
    }

    render() {
        return (
            <div className="input-group col-sm-4">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Categories</label>
                </div>
                <select className="custom-select" id="inputGroupSelect01"  onChange={event=> this.setState({ category:  'category=' + event.target.value }, () => {this.handleSearchedCategories()})}>
                    <option defaultValue>Select</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Health">Health</option>
                    <option value="Games">Games</option>
                    <option value="Music">Music</option>
                    <option value="Home">Home</option>
                    <option value="Computers">Computers</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Toys">Toys</option>
                    <option value="Tools">Tools</option> 
                    <option value="Outdoors">Outdoors</option> 
                    <option value="Automotive">Automotive</option> 
                    <option value="Movies">Movies</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Sports">Sports</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Garden">Garden</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Jewelery">Jewelery</option>
                    <option value="Kids">Kids</option>
                </select>

    
            </div>
        )
    }


}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
function mapStateToProps(state) {
 return state
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedCategories);