import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";
import _ from 'lodash'

class Products extends Component {

  constructor(props) {
      super(props);
      
      this.state = {
        search: '',
        category: '',
        price:'',
        page: ''
      }
      
      this.handleClickEvent = this.handleClickEvent.bind(this);
      this.filterCategory = this.filterCategory.bind(this);
      this.filterPrice = this.filterPrice.bind(this);
      this.changePage = this.changePage.bind(this);
  }
      
  componentDidMount() { 
    this.props.fetchProducts({})
  }

  
  handleClickEvent() {
    this.props.fetchProducts(this.state.search)
  }

  filterCategory() {
    this.props.fetchProducts(this.state.category)
  }

  filterPrice() {
    this.props.fetchProducts(this.state.price)
  }
  
  changePage() {
    this.props.fetchProducts(this.state.page)
  }

  renderHeading() {
    return (
      <div class="row">
        <div class="col-md-12">
          <h3 class="text-center">Product List</h3>
        </div>
      </div>
    )
  }
  
  // renders search bar, category drop down and price sorting
  renderSearch() {
    return (
      <div>
        <form class="search-form">
          <div class="form-group">
            <div class="col-md-3">
              <div class="input-group">
                <input type="text" id="search-input" class="form-control" placeholder="Search Products" onChange= {event => {this.setState({ search: event.target.value})}}></input>
                <button id="search-button" type="button" class="btn btn-primary search" onClick= {event=> {this.handleClickEvent(event)}}>Search</button>
              </div>
            </div>

            <div class="col-md-3">
              <div><h5 id="category-text">Product Category:</h5></div>
              <div>
                <select class="custom-select" id="inputGroupSelect01" onChange= {event=> this.setState({ category: event.target.value }, () => {this.filterCategory()})}>
                    <option defaultValue>Select</option>
                    <option>Industrial</option>
                    <option>Shoes</option>
                    <option>Movies</option>
                    <option>Health</option>
                    <option>Electronics</option>
                    <option>Kids</option>
                    <option>Automotive</option>
                    <option>Garden</option>
                    <option>Clothing</option> 
                    <option>Toys</option> 
                    <option>Beauty</option> 
                    <option>Books</option>
                    <option>Music</option>
                    <option>Tools</option>
                    <option>Computers</option>
                    <option>Jewelery</option>
                    <option>Baby</option>
                    <option>Movies</option>
                    <option>Outdoors</option>
                    <option>Sports</option>
                    <option>Grocery</option>
                    <option>Home</option>
                    <option>Games</option>
                  </select>
              </div>
            </div> 

            <div class="col-md-3">
              <div><h5 id="category-text">Sort:</h5></div>
              <div>
                <select className="custom-select"  onChange= {event=> this.setState({ price: event.target.value }, () => {this.filterPrice()})}>
                  <option defaultValue>Select</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
       </form>
     </div>
      )
  }

  
  
  // display products on the page
  renderProducts() {
    
    return _.map(this.props.products.products, product => {
      return (
        <div className="col-md-3" style={{ display: 'inline-block', margin: '4%' }}>
            <div>
                <div>
                    <h3> ${product.price}</h3>
                    <img className="img-thumbnail" src={product.image} alt=''/>
                </div>
                <div className="row">
                  <h5> {product.name}</h5>
                </div>
                <div className="row">
                  <h6> {product.category}</h6>
                </div>
            </div>
        </div>
      )
    })
      
  }
    // set page numbers based on number of products
    renderPages() {
  
      let pageNumbers = [];
      let productCount = this.props.products.productCount
      
      
      for (let i = 1; i <= Math.ceil((productCount / 9)); i++) {
          pageNumbers.push(i)
      }
      
      return pageNumbers.map(number => {
          return (
              <div>
                <nav aria-label="Page navigation example">
                  <ul>
                    <li className="page-item pagination" key={number} onClick={event => this.setState({ page: {number} }, () => { this.changePage() })}><a class="page-link" href="#">{number}</a></li>
                  </ul>
                </nav>
              </div>
          );
      });
     
  
    }

  render() {
    return (
        <div>
            <div>
              {this.renderHeading()}
            </div>
            <div>
              {this.renderSearch()}
            </div>
            <div>
              {this.renderProducts()}
            </div>
            <div>                 
              {this.renderPages()}
            </div>
        </div>
    );
  }


}

function mapStateToProps(state) {
  return { 
    products: state.products
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchProducts 
  }, dispatch);
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Products);