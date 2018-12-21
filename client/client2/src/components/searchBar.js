import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm:"",
      searchCat:""
    }
  }
  handleFormtyping (searchTerm) {
    this.setState({searchTerm})
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
            <input class="form-control mr-sm-2" value={this.state.searchTerm} onChange={(event) => this.handleFormtyping(event.target.value)} placeholder="Search for products" aria-label="Search"></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </div>
      
    )
  }
}



export default SearchBar
