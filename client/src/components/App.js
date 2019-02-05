//To Connect to both the Server and Client sides simultaneously, you need to run node server.js for the whole folder(server) and npm start for the client folder, in two different terminals. 
import React, { Component } from 'react';
//The import above brings in React while the imports below brings in all the components needed to connect to the database.
import ProductList from './ProductList';
import SearchBarCategory from './SearchBarCategory';
import SearchPriceOrder from './SearchPriceOrder';

class App extends Component {
  constructor(props) {
    super(props);
    //The state brings in the Products array, the current page that is supposed to display which by default is at 1, the total pages which is by default set to zero along with the category and price filters which will enable you to use these filters later on. 
    this.state = {     
        Products: [], 
        currentPage: 1,
        totalPages: 0,
        category: '',
        priceOrder: ''
    } 
  //handleClick is meant to bring changes to the state when an event or possibly even an e gets triggered. 
    this.handleClick = this.handleClick.bind(this);
}

//Component Did Mount is meant to enable the data that will be fetched to display. 
componentDidMount = () => {
  this.fetchData()
  
}

//This is where handleClick enables us to change the page number to whatever page number exists at the very bottom that we want to choose.
handleClick(event) { 
  this.setState({
    currentPage: this.state.currentPage = Number(event.target.id)
    
  });
//Connecting to the searchProducts function enables the handleClick to take in the data it needs to update the current page. 
  this.searchProducts()
  console.log(this.state.currentPage);
}

//This is where the data actually gets fetched.
fetchData = () => {
  fetch("http://localhost:8000/products", {
    method: "GET",
    dataType: "JSON",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  })
  .then(res => res.json())
  .then((res) => {   
    //Here, the fetchData function changes the Products, totalPages and currentPage variables in the array.  
    this.setState({ Products: this.state.Products.concat(res.Products),  totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page  }, () => console.log('CURRENT PRODUCT: ', this.state.Products) & console.log('TOTAL PAGE NUMBERS: ', this.state.totalPages)  & console.log('CURRENT PAGE NUMBER: ', this.state.currentPage))               
  })

 
}
//This is where the searchProducts function that returns the data we are looking for when we either click on page numbers below or filter by category and/or price order. 
searchProducts = () => {
  //setting the searchString to the currentPage part of state enables whichever page number we want to connect back to. 
var searchString = this.state.currentPage
  //The first if statement enables us to filter by category. The second if statement enables you to filter by priceOrder. You can filter both if both have lengths greater than zero but if only one is greater than zero, the other will persist and not be negatively affected.
  if (this.state.category.length > 0 ){
    searchString += '&category=' + this.state.category 
  }
  if (this.state.priceOrder.length > 0) {
    searchString += '&price=' + this.state.priceOrder 
  }
  //Here, I fetch data and make it appear based on what the search String is, or as stated above, what the current number of the current page.
  fetch('http://localhost:8000/products?page=' + searchString)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    //The Products, totalPages and currentPage of the state are going to be affected by changes made in this function when it is used.
    this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages, currentPage: this.state.currentPage = res.Page}, () => {
      console.log(this.state.Products);
      console.log(this.state.totalPages);
      console.log(this.state.currentPage);
    });
    
  })  
}

//The searchByPageByCategory function enables you to look up info on items in the category you click on in the drop down menu provided later.
searchProductByPageByCategory = (e) => {
  this.setState({category: this.state.category = e.target.value, currentPage: this.state.currentPage = 1});
  this.searchProducts();
  }
//The SearchProductByPrice function enables you to look up the price order you want to look up from a drop down menu that will be seen later in this code. 
searchProductByPrice = (e) => {
    this.setState({priceOrder: this.state.priceOrder = e.target.value, currentPage: this.state.currentPage = e.target.id});
    this.searchProducts(); 
    }

render() {
   
  //This array is meant to display every page number that exists in the array of totalPages. i + 1 changes the numbers that appear in both the main menu and price order from 0 through 9 to 1 through 10. 
    var pageNumbers = Array.from({length: this.state.totalPages}, (v, i) => i + 1);

    //This enables you not only to display the page numbers but to click on them as well through a reference back to handleClick.
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
      //
      <div className="App"> 
       {/* "Products" is the title */}
         <h1 align="center">Products</h1>
        {/* This is the search bar on the left. It will not work because the main intent of this project was to create page list results, which are displaying. But it does not impede with any other activities. */}
         <div class="search-bar" align="left">
            <label> Search: </label>
              <input type="text">
              </input>
         </div>
         {/* The first "Search" immediately below is the drop down selection in the center labelled Category Search and the "Search" below that is the drop down selection on the right labelled Price Order. */}
         <SearchBarCategory SearchCategory={this.searchProductByPageByCategory} />   
         <SearchPriceOrder SearchPrice={this.searchProductByPrice} />
       {/* This displays the products we want to display. */}
          <ProductList Products={this.state.Products} />   
          
         {/* This displays the page numbers at the very bottom. */}   
          <ul id="page-numbers" align="center">     
            {renderPageNumbers}   
          </ul>          
      </div>
    );
  }
}
export default App;
