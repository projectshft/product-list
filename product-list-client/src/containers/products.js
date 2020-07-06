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
      
      this.handleSearchClick = this.handleSearchClick.bind(this);
      this.filterCategory = this.filterCategory.bind(this);
      this.filterPrice = this.filterPrice.bind(this);
      this.changePage = this.changePage.bind(this);
  }
      
  componentDidMount() { 
    this.props.fetchProducts({})
  }

  
  handleSearchClick() {
    this.props.fetchProducts( {} , this.state.search)
  }

  filterCategory() {
    let query = { category: this.state.category }
    this.props.fetchProducts(query)
  }

  filterPrice() {
    let query = { price: this.state.price }
    this.props.fetchProducts(query)
  }
  
  changePage() {
    let query = { page: this.state.page.number }
    this.props.fetchProducts(query)
  }

  renderHeading() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center">Product List</h3>
        </div>
      </div>
    )
  }
  
  // renders search bar, category drop down and price sorting
  renderSearch() {
    return (
      <div>
        <form className="search-form">
          <div className="form-group">
            <div className="col-md-3">
              <div className="input-group">
                <input type="text" id="search-input" className="form-control" placeholder="Search Products" onChange= {event => {this.setState({ search: event.target.value})}}></input>
                <button id="search-button" type="button" className="btn btn-primary search" onClick= {event=> {this.handleSearchClick(event)}}>Search</button>
              </div>
            </div>

            <div className="col-md-3">
              <div><h5 id="category-text">Product Category:</h5></div>
              <div>
                <select className="custom-select" id="inputGroupSelect01" onChange= {event=> this.setState({ category: event.target.value }, () => {this.filterCategory()})}>
                    <option defaultValue>Select</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Movies">Movies</option>
                    <option value="Health">Health</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Kids">Kids</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Garden">Garden</option>
                    <option value="Clothing">Clothing</option> 
                    <option value="Toys">Toys</option> 
                    <option value="Beauty">Beauty</option> 
                    <option value="Books">Books</option>
                    <option value="Music">Music</option>
                    <option value="Tools">Tools</option>
                    <option value="Computers">Computers</option>
                    <option value="Jewelry">Jewelery</option>
                    <option value="Baby">Baby</option>
                    <option value="Outdoors">Outdoors</option>
                    <option value="Sports">Sports</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Home">Home</option>
                    <option value="Games">Games</option>
                  </select>
              </div>
            </div> 

            <div className="col-md-3">
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
    if (this.props.products.products) {
      
    
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
      
  } else {
  return (
    <div> <h6> Products could not be found </h6> </div>
    )
  } 
    
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
              <li className="page-item" key={number} onClick={event => this.setState({ page: {number} }, () => { this.changePage() })}><a className="page-link" href="#">{number}</a></li>
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
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {this.renderPages()}
                </ul>
              </nav>
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