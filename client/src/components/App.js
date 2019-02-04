import React, { Component } from 'react';
// import Routes from './Routes';
import ProductList from './ProductList';
import SearchBarCategory from './SearchBarCategory';
import SearchPriceOrder from './SearchPriceOrder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {     
        Products: [], 
        currentPage: 1,
        totalPages: 0,
        category: '',
        priceOrder: ''
    } 
    this.handleClick = this.handleClick.bind(this);
}


componentDidMount = () => {
  this.fetchData()
  
}

handleClick(event) {
  
  this.setState({
    currentPage: this.state.currentPage = Number(event.target.id)
    
  });
  this.searchProducts()
  console.log(this.state.currentPage);
}

fetchData = (event) => {
  fetch("http://localhost:8000/products", {
    method: "GET",
    dataType: "JSON",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  })
  .then(res => res.json())
  .then((res) => {     
    this.setState({ Products: this.state.Products.concat(res.Products),  totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page  }, () => console.log('CURRENT PRODUCT: ', this.state.Products) & console.log('TOTAL PAGE NUMBERS: ', this.state.totalPages)  & console.log('CURRENT PAGE NUMBER: ', this.state.currentPage))               
  })

 
}

searchProducts = (e) => {
var searchString = this.state.currentPage
  
  if (this.state.category.length > 0 ){
    searchString += '&category=' + this.state.category 
  }
  if (this.state.priceOrder.length > 0) {
    searchString += '&price=' + this.state.priceOrder 
  }
  fetch('http://localhost:8000/products?page=' + searchString)
  .then(res => res.json())
  .then(res => {
    //let searchResult = JSON.parse(responseBody).results;
    console.log(res);
    this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page}, () => {
      console.log(this.state.Products);
      console.log(this.state.totalPages);
      console.log(this.state.currentPage);
    });
    
  })  
}


searchProductByPageByCategory = (e) => {
  this.setState({category: this.state.category = e.target.value, currentPage: this.state.currentPage = 1});
  this.searchProducts();
  // fetch('http://localhost:8000/products?page=' + this.state.currentPage + '&category=' + e.target.value)
  // .then(res => res.json())
  // .then(res => {
  //   //let searchResult = JSON.parse(responseBody).results;
  //   console.log(res);
  //   this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page }, () => {
  //     // console.log(this.state.Products);
      // console.log(this.state.totalPages);
      // console.log(this.state.currentPage);
 
  }

  searchProductByPrice = (e) => {
    this.setState({priceOrder: this.state.priceOrder = e.target.value, currentPage: this.state.currentPage = e.target.id});
    this.searchProducts();
    // fetch('http://localhost:8000/products?page=' + this.state.currentPage + '&price=' + event.target.value)
    // .then(res => res.json())
    // .then(res => {
    //   //let searchResult = JSON.parse(responseBody).results;
    //   console.log(res);
    //   this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page }, () => {
    //     console.log(this.state.Products);
    //   });
      
    // })  
    }

  render() {
   
    var pageNumbers = Array.from({length: this.state.totalPages}, (v, i) => i + 1);

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <span
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </span>
       
      );
    });
   
    return (
      
      <div className="App">
      
         <h1>Products</h1>
          <SearchBarCategory SearchCategory={this.searchProductByPageByCategory} />     
          <SearchPriceOrder SearchPrice={this.searchProductByPrice} />
          <ProductList Products={this.state.Products} />   
          
            
           <ul id="page-numbers" align="center">     
            {renderPageNumbers}   
          </ul>
          
      </div>
      
    );
   
  }
}

export default App;
