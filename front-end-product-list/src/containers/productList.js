import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';


class ProductList extends Component {
  constructor(props) {
    super(props)
  
  }

  async componentDidMount() { 
    await
    this.props.fetchProducts({})
  }

  renderNavigation() {
    return (
    <div>
      <form class="search-form">
        <div class="form-group">
          <div class="input-group">
            <input type="text" id="search-input" class="form-control" placeholder="Search Products"></input>
            <button id="search-button" type="button" class="btn btn-danger search">Search</button>
            <div><h4 id="category-text" className="lobster">filter by category:  </h4></div>
            <select>
              <option>Movies</option>
              <option>Automotive</option>
              <option>Computers</option>
              <option>Baby</option>
              <option>Computers</option>
              <option>Music</option>
              <option>Games</option>
              <option>Shoes</option>
              <option>Grocery</option>
              <option>Electronics</option>
              <option>Beauty</option>
              <option>Garden</option>
              <option>Jewelry</option>
              <option>Toys</option>
              <option>Clothing</option>
              <option>Kids</option>
              <option>Tools</option>
              <option>Sports</option>
              <option>Home</option>
              <option>Industrial</option>
              <option>Health</option>
              <option>Books</option>
            </select>
            <div><h4 id="category-text">sort by:  </h4></div>
            <select>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>
      </form>
    </div>
    )
  }

  renderPageNumbers(){
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center pagination-lg">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    )
  }

  renderProducts(productList) {
    console.log(productList)
    return (
      productList.products.map(p => (
          <div className="col-md-4">
            <div className="card-container">
              <div className="card item">
                <div className="pricebox">
                  <p className="price">${p.price}</p>
                </div>
                <div className="buybox">
                  <p className="add-to-cart"> ADD TO CART </p>
                </div>
                <div className="card-inner">
                <h4 id="product-category" className="text-right">{p.category}</h4>
                  <img src={p.image} class="proimage"></img>
                  <h4 id="product-name">{p.name}</h4>
                </div>
              </div>
            </div>
          </div>
      ))
    )
  }

  render(){
    return(
      <div id="main-view" className="container">
        <hr></hr>
        <div>{this.props.products.map(this.renderNavigation)}</div>
         <div className="row">
         <div>{this.props.products.map(this.renderProducts)}</div>
         <div className="col-md-6 offset-md-3">
         <div>{this.props.products.map(this.renderPageNumbers)}</div>
         </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({products}) {
  return { products }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchProducts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);