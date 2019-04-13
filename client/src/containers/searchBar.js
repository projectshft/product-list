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
      <div className='header'>
        <h1 className='text-center'>Products</h1>
        <div className="header-content">
          <form onSubmit={this.onFormSubmit}>
            <input
              onChange={this.onInputChange}
              value={this.state.term}
              placeholder='Search products'
              type="text" />
          </form>
          <div className="buttons">
            <div className="btn-group category-btn">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by category
            </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Games</a>
                <a className="dropdown-item" href="#">Health</a>
                <a className="dropdown-item" href="#">Clothing</a>
                <a className="dropdown-item" href="#">Home</a>
                <a className="dropdown-item" href="#">Electronics</a>
                <a className="dropdown-item" href="#">Outdoors</a>
              </div>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by price
            </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">High</a>
                <a className="dropdown-item" href="#">Low</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
