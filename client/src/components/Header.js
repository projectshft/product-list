import React, { Component } from 'react'

export class Header extends Component {
  constructor() {
    super()

    this.state = {
      showCategoryMenu: false,
      showPriceSortMenu: false
    }

    this.showCategoryMenu = this.toggleCategoryMenu.bind(this)

    this.showPriceSortMenu = this.togglePriceSortMenu.bind(this)
  }

  //show category menu when the active link is clicked or hide when it is clicked again
  toggleCategoryMenu = e => {
    e.preventDefault()

    this.setState({
      showCategoryMenu: !this.state.showCategoryMenu
    })
  }

  //show price sort menu when the active link is clicked or hide when it is clicked again
  togglePriceSortMenu = e => {
    e.preventDefault()

    this.setState({
      showPriceSortMenu: !this.state.showPriceSortMenu
    })
  }

  render() {
    //destructure state
    const { showCategoryMenu, showPriceSortMenu } = this.state

    return (
      <div
        className="container-fluid fixed-top"
        style={{ backgroundColor: 'white' }}
      >
        <div className="h1 mt-4 mb-5"> PRODUCTS </div>
        <nav className="navbar navbar-light navbar-expand-lg mt-5 mb-4 py-1">
          <div className="container-fluid">
            <form>
              <div className="form-group form-group-sm">
                <input
                  type="text"
                  id="search-query"
                  className="form-control input-sm"
                  placeholder="Search"
                />
              </div>
            </form>
            <div className="dropdown">
              <span> Filter by Category: </span>
              <button
                className="btn btn-secondary"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.toggleCategoryMenu}
              >
                Select
              </button>
              {showCategoryMenu ? (
                <div className="shadow-sm">
                  <button className="dropdown-item">Electronics</button>
                  <button className="dropdown-item">Garden</button>
                  <button className="dropdown-item">Movies</button>
                  <button className="dropdown-item">Beauty</button>
                  <button className="dropdown-item">Automotive</button>
                </div>
              ) : null}
            </div>
            <div className="dropdown">
              <span> Sort By: </span>
              <button
                className="btn btn-secondary"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.togglePriceSortMenu}
              >
                Select
              </button>
              {showPriceSortMenu ? (
                <div className="shadow-sm">
                  <button className="dropdown-item">price: Low to High</button>
                  <button className="dropdown-item">price: High to Low</button>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
//as of right now, this component doesn't need to connect to the redux store because presently no other component needs to know about what state it has
export default Header
