import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchProducts } from '../actions'


class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm:""
    }
    
  }
  componentDidMount() {
    //somehow get the products on the state
    const { fetchProducts } = this.props;
  

  }
  handleFormtyping (searchTerm) {
    this.setState({searchTerm})
  }

  

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="form-inline">
            <input className="form-control mr-sm-2" value={this.state.searchTerm} onChange={(event) => this.handleFormtyping(event.target.value)} placeholder="Search for products" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={() =>this.props.fetchProducts(this.state.searchTerm)}>Search</button>
          </div>
        </nav>
      </div>
      
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts }, dispatch);
}



export default connect(null,mapDispatchToProps)(SearchBar)
