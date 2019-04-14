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

  //show category menu when the active link is clicked or hide when it is clicked again
  togglePriceSortMenu = e => {
    e.preventDefault()

    this.setState({
      showPriceSortMenu: !this.state.showPriceSortMenu
    })
  }

  render() {
    //const { showCategoryMenu, showPriceSortMenu } = this.state

    return (
      <div className="container-fluid">
        <div className="h1 mt-4 mb-5"> PRODUCTS </div>
        <nav className="navbar navbar-light navbar-expand-lg mt-5 mb-3 py-1">
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
              {this.state.showCategoryMenu ? (
                <div>
                  <a className="dropdown-item" href="#">
                    Electronics
                  </a>
                  <a className="dropdown-item" href="#">
                    Garden
                  </a>
                  <a className="dropdown-item" href="#">
                    Movies
                  </a>
                  <a className="dropdown-item" href="#">
                    Beauty
                  </a>
                  <a className="dropdown-item" href="#">
                    Automotive
                  </a>
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
              {this.state.showPriceSortMenu ? (
                <div>
                  <a className="dropdown-item" href="#">
                    price: Low to High
                  </a>
                  <a className="dropdown-item" href="#">
                    price: High to Low
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
