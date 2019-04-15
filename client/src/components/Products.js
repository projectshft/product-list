// eslint-disable-next-line
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      page: 1,
      category: "",
      sort: ""
    };

    this.onPageClick = this.onPageClick.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.onSort = this.onSort.bind(this)
  }

  //on page load, fetch all products
  componentDidMount() {
    this.props.fetchProducts();
  }

  //when page number is clicked, render to that page
  onPageClick(event) {
    this.setState({ page: event.target.id })  
    this.props.fetchProducts(event.target.id, this.state.category, this.state.sort);
  }

  //when category is selected, filter for that category
  onCategoryClick(event) {
    this.setState({ category: event.target.value, page: 1 }) 
    this.props.fetchProducts(1, event.target.value, this.state.sort)
  }

  //when sort is selected, add sort query and rerender
  onSort(event) {
    this.setState({ sort: event.target.value}) 
    this.props.fetchProducts(this.state.page, this.state.category, event.target.value)
  }

  render() {
    return (
      <section className="full-page padding-lg pg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              {/* HEADER */}
              <div className="header">
                <div className="header-bar">
                  <h1 className="text-center">PRODUCTS</h1>
                </div>

                <div className="input-group">
                  <form className="form-inline">
                    <input type="text" className="form-control" placeholder="Search for products" />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>

                    <select className="custom-select mr-sm-2" onChange={this.onCategoryClick} defaultValue="category" id="category">
                      <option value="category" hidden disabled>Filter by Category</option>
                      <option value="baby">Baby</option>
                      <option value="garden">Garden</option>
                      <option value="grocery">Grocery</option>
                      <option value="games">Games</option>
                      <option value="home">Home</option>
                      <option value="industrial">Industrial</option>
                      <option value="jewelery">Jewelery</option>
                      <option value="tools">Tools</option>
                      <option value="">Show All</option>

                    </select>

                    <select className="custom-select mr-sm-2" onChange={this.onSort} id="sort" defaultValue="sort">
                      <option value="sort" hidden disabled>Sort by price</option>
                      <option value="low">Price: Low to High</option>
                      <option value="high">Price: High to Low</option>
                      <option value="">Remove Sort</option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="container">
          <ul className="row">
            {this.props.products.map(product => (
              <div key={product._id}>
                <li className="col-12 col-md-6 col-lg-3">
                  <div className="contact-card">
                    <p className="category"> Category: {product.category}</p>
                    <h3 className="price">${product.price}</h3>
                    <img className="img-responsive" alt="Products" src={product.image} />
                    <h3 className="product">{product.name}</h3>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            {/* PAGE NUMBERS */}
            <div>
              <ul className="pagination pg-purple">
                <li className="page-item"><button className="page-link" id="1" onClick={this.onPageClick}>1</button></li>
                <li className="page-item"><button className="page-link" id="2" onClick={this.onPageClick}>2</button></li>
                <li className="page-item"><button className="page-link" id="3" onClick={this.onPageClick}>3</button></li>
                <li className="page-item"><button className="page-link" id="4" onClick={this.onPageClick}>4</button></li>
                <li className="page-item"><button className="page-link" id="5" onClick={this.onPageClick}>5</button></li>
                <li className="page-item"><button className="page-link" id="6" onClick={this.onPageClick}>6</button></li>
                <li className="page-item"><button className="page-link" id="7" onClick={this.onPageClick}>7</button></li>
                <li className="page-item"><button className="page-link" id="8" onClick={this.onPageClick}>8</button></li>
                <li className="page-item"><button className="page-link" id="9" onClick={this.onPageClick}>9</button></li>
                <li className="page-item"><button className="page-link" id="10" onClick={this.onPageClick}>10</button></li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)  