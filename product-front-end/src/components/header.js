import React, { Component } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent }  from 'react-simple-dropdown'
import { setCategory, setSort } from '../actions'
import './header.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import {Icon} from 'react-fa'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class Header extends Component {
  render() {
    return(
      <nav className="front navbar navbar-expand navbar-light bg-light">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"> Filter by Category:
            <div>
              <Dropdown>
                <DropdownTrigger>Games <Icon name="angle-down"/></DropdownTrigger>
                <DropdownContent>
                  <div className="list-group my-2 my-lg-0 ml-auto">
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Games")}}>Games</button>
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Tools")}}>Tools</button>
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Health")}}>Health</button>
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Clothing")}}>Clothing</button>
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Home")}}>Home</button>
                    <button type="button" className="list-group-item list-group-item-action" onClick={()=>{this.props.setCategory("Electronics")}}>Electronics</button>
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>

          </li>
          <li className="invisible"> ---- </li>
          <li className="nav-item my-2 my-lg-0"> Sort by Price:
            <div>
              <Dropdown>
                <DropdownTrigger>Low to High <Icon name="angle-down"/></DropdownTrigger>
                <DropdownContent>
                  <div className="list-group mt-2">
                    <button type="button" className="list-group-item list-group-item-action">Low to High</button>
                    <button type="button" className="list-group-item list-group-item-action">High to Low</button>
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>
          </li>
        </ul>


      </nav>

    )
  }
}

function mapStateToProps(state) {
  return { products: state.products, query: state.query, pages: state.pages };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setCategory: setCategory, setSort: setSort }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
