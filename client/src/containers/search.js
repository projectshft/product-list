import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';


class Search extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        category: '',
      };
      this.onSearchange = this.onSearchChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    onSearchChange(event) {
      console.log(event.target.value)
      this.setState({ category: event.target.value });
    }
  
    onSubmit(event) {
      event.preventDefault();
    
      this.props.fetchCategory(this.state.category);
      this.setState({ category: ''});
    }
  
  
    render() {
      return (
        <div className="col-md-3">
        <form onChange={this.onSearchChange} className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
            <label className="col-form-label" style={{paddingRight: "5px", paddingLeft: "30px"}}>Search</label>
            <input onSubmit={this.OnSubmit} className="form-control form-control-sm" id="inputSearch"/>
        </form>
        </div>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);