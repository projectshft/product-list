import React, { Component } from 'react'

export default class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      view: false
    }
  }

  onInputChange = (e) => {
    this.setState({ term: e.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          onChange={this.onInputChange}
          value={this.state.term}
          placeholder='Search products'
          type="text" />
      </form>
    )
  }
}
