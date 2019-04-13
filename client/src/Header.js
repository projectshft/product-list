import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <a className="navbar-brand" href="/">
            PRODUCT LIST
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  Filter by category
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/">
                    A Category
                  </a>
                  <a className="dropdown-item" href="/">
                    Another Category
                  </a>
                  <a className="dropdown-item" href="/">
                    And Another
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  Sort by:
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/">
                    Low to High
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/">
                    High to Low
                  </a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
