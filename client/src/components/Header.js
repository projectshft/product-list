import React from 'react'

export default function Header() {
  return (
    <div>
      <div className="h1 mt-4 mb-5"> PRODUCTS </div>
      <nav className="navbar navbar-light navbar-expand-lg mt-5 mb-3 py-1">
        <div className="container-fluid">
          <form>
            <div class="form-group form-group-sm">
              <input
                type="text"
                id="search-query"
                class="form-control input-sm"
                placeholder="Search"
              />
            </div>
          </form>
          <div className="dropdown show">
            <span> Filter by Category: </span>
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Kitchen
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="#">
                Sports
              </a>
              <a className="dropdown-item" href="#">
                Garden
              </a>
              <a className="dropdown-item" href="#">
                Entertainment
              </a>
            </div>
          </div>
          <div className="dropdown show">
            <span> Sort By: </span>
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Price: Low to High
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="#">
                price: High to Low
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
