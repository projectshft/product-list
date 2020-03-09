import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProductsByName } from '../actions/index';


class Search extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        name: '',
      };
      this.onSearchange = this.onSearchChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    onSearchChange(event) {
      console.log(event.target.value)
      console.log(this.state.name)
      this.setState({ name: event.target.value });
    }
  
    onSubmit(event) {
      event.preventDefault();
    
      this.props.fetchProductsByName(this.state.name);
      this.setState({ name: ''});
    }
  
  
    render() {
      return (
        <div className="col-md-3">
        <form onSubmit={this.onSubmit} className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
            <label className="col-form-label" style={{paddingRight: "5px", paddingLeft: "30px"}}>Search</label>
            <input onChange={this.OnSearchChange} className="form-control form-control-sm" id="inputSearch"/>
        </form>
        </div>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProductsByName }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);