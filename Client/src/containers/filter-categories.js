import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

//this component filters the product list by category 
class FilterCategories extends Component {

    constructor() {
        super();
        //sets the currentCategory state
        this.state = {
            currentCategory: ''
        }
        this.handleFilterCategories = this.handleFilterCategories.bind(this);
      }

    //helper function that fetches the currentCategory based on change in select
    handleFilterCategories() {    
        this.props.fetchProducts(this.state.currentCategory)

    }

    render () {
        return (
           
            <div className="input-group col-sm-4">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Filter by Categories</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01"  onChange={event=> this.setState({ currentCategory:  'category=' + event.target.value }, () => {this.handleFilterCategories()})}>
                        <option defaultValue>Choose...</option>
                        <option value="Games">Games</option>
                        <option value="Toys">Toys</option>
                        <option value="Home">Home</option>
                        <option value="Jewlery">Jewelery</option>
                        <option value="Garden">Garden</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Kids">Kids</option>
                        <option value="Movies">Movies</option>
                        <option value="Sports">Sports</option>
                        <option value="Tools">Tools</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories);