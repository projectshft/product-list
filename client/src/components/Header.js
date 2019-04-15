import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { filterCategory } from '../actions'
import { sortPrice } from '../actions'

class Header extends Component {
  constructor() {
    super()

    this.state = {
      showCategoryMenu: false,
      showPriceSortMenu: false,
      category: '',
      price: ''
    }

    this.showCategoryMenu = this.toggleCategoryMenu.bind(this)

    this.showPriceSortMenu = this.togglePriceSortMenu.bind(this)

    this.category = this.filterByCategory.bind(this)
    this.price = this.sortByPrice.bind(this)
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

  filterByCategory = e => {
    e.preventDefault()

    this.setState({ category: e.target.id })

    //fetch the correct products basd on category
    this.props.filterCategory(e.target.id)
  }
  sortByPrice = e => {
    e.preventDefault()

    this.setState({ price: e.target.id })

    //fetch the correct products basd on sorting price low to high or high to low
    this.props.sortPrice(e.target.id)
  }
  render() {
    //destructure state
    const { showCategoryMenu, showPriceSortMenu } = this.state

    return (
      <div
        className="container-fluid fixed-top shadow-sm"
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
                  placeholder="Search by Product ID"
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
                Select {}
                <i class="fas fa-caret-down" />
              </button>
              {showCategoryMenu ? (
                <div className="shadow-sm">
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Electronics"
                  >
                    Electronics
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Garden"
                  >
                    Garden
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Movies"
                  >
                    Movies
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Toys"
                  >
                    Toys
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Grocery"
                  >
                    Grocery
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Beauty"
                  >
                    Beauty
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={this.filterByCategory}
                    id="Automotive"
                  >
                    Automotive
                  </button>
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
                Select {}
                <i class="fas fa-caret-down" />
              </button>
              {showPriceSortMenu ? (
                <div className="shadow-sm">
                  <button
                    className="dropdown-item"
                    id="lowest"
                    onClick={this.sortByPrice}
                  >
                    price: Low to High
                  </button>
                  <button
                    className="dropdown-item"
                    id="highest"
                    onClick={this.sortByPrice}
                  >
                    price: High to Low
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  //make props available to Header component
  return { products: state.products }
}

function mapDispatchToProps(dispatch) {
  //whenever filterCategory is called, the result should be passed to the reducer
  return bindActionCreators({ filterCategory, sortPrice }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
