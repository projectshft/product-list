import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, productSearch } from "../actions/index";

class Search extends Component {
    constructor(props) {
      super(props);
 
      this.state = { 
        searchVal: ''
      };
      this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
      console.log('from search searchValue: ', this.state.searchVal)    
      this.props.productSearch(`&name=${ this.state.searchVal }`)
      this.setState({ searchVal: '' })
    }

    render() {
        return (
            <div className='col'>
                <input name="searchVal" id="search" type="text" onChange={event => this.setState({ searchVal: event.target.value })}></input>
                <button id="subButton" type="button" className="btn btn-light" onClick={this.handleTextChange}>Search</button>
            </div>
        )
    }
}
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts, productSearch }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(Search);
