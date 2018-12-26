import React, { Fragment, Component } from 'react';

class App extends Component {
  render() {
    return (
    <Fragment>
      <div className="container">
        <h1 className="mx-auto">Project Shift Store</h1>
      </div>
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div>
          <label for='category'>Filter by Category:</label>
          <select id="category">
              <option value="">All Products</option>
              <option value="Tools">Tools</option>
              <option value="Home">Home</option>
              <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div>
            <label for='price'>Filter by Price:</label>
            <select id="price">
                <option value="Asc">Low to High</option>
                <option value="Des">High to Low</option>
            </select>
          </div>
      </nav>
      <div className="container">
        <p>Searching for: <strong>Bacon</strong> in <strong>Tools</strong></p>
        <p>Total number of items: <strong>90</strong></p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="card bg-light h-150">
              <div className="card-body">
                <h2 className="card-title">Practical Wooden Sausages</h2>
                <h4>Category: Tools</h4>
                <h3>$43</h3>
              </div>
              <div>
                <img className="card-img" src="http://placehold.it/700x400" alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card bg-light h-150">
              <div className="card-body">
                <h2 className="card-title">1234567890abcdefghijklmnopqrs</h2>
                <h4>Category: Tools</h4>
                <h3>$43</h3>
              </div>
              <div>
                <img className="card-img" src="http://placehold.it/700x400" alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card bg-light h-150">
              <div className="card-body">
                <h2 className="card-title">Product Title</h2>
                <h4><strong>Category:</strong> Tools</h4>
                <h3>$43</h3>
              </div>
              <div>
                <img className="card-img" src="http://placehold.it/700x400" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" tabIndex='0'>1</a></li>
          <li className="page-item"><a className="page-link" tabIndex='0'>2</a></li>
          <li className="page-item"><a className="page-link" tabIndex='0'>3</a></li>
        </ul>
      </nav>
    </Fragment>
    );
  }
}

export default App;
