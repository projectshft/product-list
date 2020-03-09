import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';
import {fetchSearch} from '../actions/index'


class ProductList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      category: '',
      price:'',
      page: ''
    }

  }

  componentDidMount() { 
    this.props.fetchProducts({})
  }

  handleClickEvent() {
    this.props.fetchSearch(this.state.search)
  }

  handleFilterClickEvent() {
    console.log(this.state.category)
    let query = { category: this.state.category, price: this.state.price}
    this.props.fetchProducts(query)
  }

  handlePageClick() {
    let query = { page: this.state.page.number }
    console.log(query)
    this.props.fetchProducts(query)
  }

  renderSearch() {
    return (
     <div>
       <form class="search-form">
         <div class="form-group">
           <div class="input-group">
             <input type="text" id="search-input" class="form-control" placeholder="Search Products" onChange= {event => {this.setState({ search: event.target.value})}}></input>
             <button id="search-button" type="button" class="btn btn-danger search" onClick= {event=> {this.handleClickEvent(event)}}>Search</button>
             <div><h4 id="category-text" className="lobster">filter by category:  </h4></div>
             <select onChange= {event=> this.setState({ category: event.target.value }, () => {this.handleFilterClickEvent()})}>
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
               <option>All</option>
             </select>
             <div><h4 id="category-text">sort by:  </h4></div>
             <select onChange= {event=> this.setState({ price: event.target.value }, () => {this.handleFilterClickEvent()})}>
               <option value="highest">Price: High to Low</option>
               <option value="lowest">Price: Low to High</option>
             </select>
           </div>
         </div>
       </form>
     </div>
     )
   }

  renderPageNumbers() {

    if (this.props.productList[0] == undefined) {
      return (
        <div>Loading ... </div>
      )
    } else {

    let pageNumbers = [];
    let count = this.props.productList[0].count
console.log(count)

    for (let i = 1; i <= Math.ceil(count / 9); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(number => {
      return (
        <div>
          <li class="page-item" key={number} onClick={event=> this.setState({ page: {number} }, () => {this.handlePageClick()})}><a class="page-link" href="#">{number}</a></li>
        </div>
      )
    })
  }
}

  renderProducts() {
    console.log(this.props.productList)
    if (this.props.productList[0] == undefined) {
      return (
        <div>Loading ... </div>
      )
    } else if (this.props.productList[0].count === 0){
      return (
        <div>
          <h2>Sorry! There were no products that matched that keyword.</h2>
        </div>
      )
    } else {
    return (
       this.props.productList[0].products.map(p => (
          <span className="product col-md-4">
            <div className="card-container">
              <div className="card item">
                <div className="pricebox">
                  <p className="price">${p.price}</p>
                </div>
                <div className="buybox">
                  <p className="add-to-cart"> ADD TO CART </p>
                </div>
                <div className="card-inner">
                <br></br>
                <br></br>
                <h5 id="product-category" className="text-right">Category: {p.category}</h5>
                  <img src={p.image} class="proimage"></img>
                  <h4 id="product-name">{p.name}</h4>
                  <br></br>
              </div>
            </div>
          </div>
        </span>
      ))
    )
  }
}

  render() {
    return(
      <div id="main-view" className="container">
        <hr></hr>
         <div>{this.renderSearch()}</div>
          <div className="row">
            <div className="col-12">
              {this.renderProducts()}
            </div>
          </div>
          <br></br>
         <div className="col-md-6 offset-md-3">
         <nav aria-label="Page navigation example">
         <ul class="pagination justify-content-center pagination-lg">
           {this.renderPageNumbers()}
         </ul>
         </nav>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    productList: state.productList
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchSearch,
      fetchProducts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);