import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import ReactPaginate from 'react-paginate';


import { fetchProductInformation } from "../actions";

class App extends Component {
  constructor() {
    super()

    this.state = {
      query: '',
      category: '',
      sort: '',
      currentPage: 1,
    }

    this.handlePageClick = this.handlePageClick.bind(this);

  }

  componentDidMount() {
    this.props.fetchProductInformation(1, '', 'highest', '');
  }

  componentDidUpdate(prevProps, prevState) {
    //first ensure componentDidUpdate is not checking updating on first API pull
    if (!prevProps.products) {
      console.log('first update')
      //checking state to see if any changes have been made
      //based on changes to the form in the render function
    } else if (prevState.query !== this.state.query || prevState.category !== this.state.category || 
              prevState.sort !== this.state.sort || prevState.currentPage !== this.state.currentPage){
      
      this.props.fetchProductInformation(this.state.currentPage, this.state.category, this.state.sort, this.state.query);
    }
  }

  //function to handle the clicking of each page in ReactPagination
  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;

    this.setState({
      currentPage: selectedPage
    })
  }

  render() {
    //display "loading" text if props does not yet contain data
    if (!this.props.products) {
      return (
        <h1>Loading...</h1>
      )
    }

    //helper function to display each product in the router return
    const productDisplay = () => {
      console.log(this.props.products.count)
      return (
       //map through each product in the array returned in props
       this.props.products.products.map(product => {
         return (
            <div className="col-md-3 offset-md-5 m-2 product-div">
              <div className="row">
                <div className="col-md-8">
                  <p>Category: {product.category}</p>
                </div>
                <div className="col-md-4">
                  <h5 className="text-right ">${(product.price)/100}</h5>
                </div>
              </div>
              <img className="mx-auto d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjlJapFK9txjcNzYxxibA5Sghs_0IkTh2_gQ&usqp=CAU"></img>
              <h4 className="text-center">{product.name}</h4>
            </div>
          )
        })
      )
    }

    return (

      <div>
        {/* form for searching products displayed at the top of the page */}
        <div className="row justify-content-md-center py-2">
          <form>
            {/* user's search bar entry will be stored in state */}
            <label className="mr-2">Search</label>
            <input className="mr-4" type="search" onChange={event => this.setState({ query: event.target.value }) }></input>
            
            {/* category selection changes will be stored in state */}
            <label className="mr-2">Filter by Category</label>
            <select className="mr-4" name="category" onChange={event => this.setState({ category: event.target.value }) }>
              <option value=""></option>
              <option value="Automotive">Automotive</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Games">Games</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
              <option value="Jewelery">Jewelery</option>
              <option value="Kids">Kids</option>
              <option value="Toys">Toys</option>
            </select>

            {/* sort selection change will be changed in state */}
            <label className="mr-2">sort by:</label>
            <select className="mr-4" id="cars" name="cars" onChange={event => this.setState({ sort: event.target.value }) }>
              <option value="highest">highest</option>
              <option value="lowest">lowest</option>
            </select>

          </form>
        </div>
        
        {/* Display all products in redux fetch request */}
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            {productDisplay()}
          </div>
        </div>

        {/* container for Pagination buttons for the user
        onPageChange is the function that will update the state by calling the handlePageClick function */}
        <div className="row justify-content-md-center">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            //changing the number of pages to display based on the query search results
            pageCount={Math.ceil((this.props.products.count)/9)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ fetchProductInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(App);