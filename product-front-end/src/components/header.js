import React, { Component } from 'react'
import { setCategory, setSort, fetchProducts, getCategories, getCount, submitSearch, setPage } from '../actions'
import './header.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import {Icon} from 'react-fa'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      category: "All",
      sortOrder: ""
    }

    this.props.getCategories()

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value}, () => {
      this.props.setCategory(this.state.category)
      this.props.setPage(1)
      this.props.fetchProducts(this.props.query).then(response => {
        this.props.getCount(this.props.query)

      })
    })

  }

  handleSortChange(event) {
    this.setState({sortOrder: event.target.value}, () => {
      this.props.setSort(this.state.sortOrder)
      this.props.fetchProducts(this.props.query).then(response => {
        this.props.getCount(this.props.query)
      })
    });
  }

  handleSearchTyping(event) {
    this.setState({searchTerm:event.target.value})
  }


  render() {
    return(
      <nav className="front navbar navbar-expand navbar-light bg-light">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-primary" value={this.state.searchTerm} onChange={this.handleSearchTyping} onClick={(event)=>this.props.submitSearch(event)} type="submit">Search</button>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-5"> Filter by Category:
            <div>
              <div className="list-group ml-auto">
                <select className="form-control mt-3 mb-2" value={this.state.category} onChange={this.handleCategoryChange}>
                  <option className="category" value="">All</option>
                  {
                    this.props.categories.map((category, i) => {
                      return(
                        <option key={i} className="category" value={category}>{category}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

          </li>
          <li className="nav-item"> Sort by Price:
            <div>
              <div className="list-group ml-auto">
                <select className="form-control mt-3 mb-2" value={this.state.sortOrder} onChange={this.handleSortChange}>
                  <option className="category" value="">None</option>
                  <option className="category" value="lowest">Low to High</option>
                  <option className="category" value="highest">High to Low</option>

                </select>
              </div>
            </div>
          </li>
        </ul>


      </nav>

    )
  }
}

function mapStateToProps(state) {
  return { products: state.products, query: state.query, pages: state.pages, categories: state.categories };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCategory: setCategory, setSort: setSort, fetchProducts:fetchProducts, getCategories:getCategories, getCount: getCount, submitSearch: submitSearch, setPage:setPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
