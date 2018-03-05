import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dropdown, { DropdownTrigger, DropdownContent }  from 'react-simple-dropdown'
import './header.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import {Icon} from 'react-fa'

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
                    <button type="button" className="list-group-item list-group-item-action">Games</button>
                    <button type="button" className="list-group-item list-group-item-action">Tools</button>
                    <button type="button" className="list-group-item list-group-item-action">Health</button>
                    <button type="button" className="list-group-item list-group-item-action">Clothing</button>
                    <button type="button" className="list-group-item list-group-item-action">Home</button>
                    <button type="button" className="list-group-item list-group-item-action">Electronics</button>
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>

          </li>
          <li className="invisible"> ----------- </li>
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

export default Header
