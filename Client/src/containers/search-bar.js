import React from 'react';
import {Component} from 'react';
import { fetchProducts } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = { term: '' };
    
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    
      onInputChange(event) {
        this.setState({ term: event.target.value });
      }
    
      onFormSubmit(event) {
        event.preventDefault();
    
        this.props.fetchProducts(1, null, null, this.state.term);
        this.setState({ term: '' });
      }
    render () {
        return (

 
          <form onSubmit={this.onFormSubmit} className="input-group col-sm-4" >
              <input 
                placeholder="Search for a product"
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
  
          );
    }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

function mapStateToProps({products}) {
return { products};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);