import React, { Component } from 'react';
// import Routes from './Routes';
import SearchBarProduct from './SearchBarProduct';
import ProductList from './ProductList';
import SearchBarCategory from './SearchBarCategory';
import SearchPriceOrder from './SearchPriceOrder';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {     
        Products: [], 
        totalPages: 0
    } 
}

componentDidMount = () => {
  this.fetchData()
  
}
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
    this.setState({ Products: this.state.Products.concat(res.Products),  totalPages: this.state.totalPages = res.Pages  }, () => console.log('CURRENT PRODUCT: ', this.state.Products) & console.log('CURRENT PAGE NUMBERS: ', this.state.totalPages))               
  })

 
}

searchProductByPage = (e) => {
fetch('http://localhost:8000/products?page='+ e.target.value)
.then(res => res.json())
.then(res => {
  console.log(res);
  this.setState( {Products: this.state.Products.concat(res.Products), totalPages: this.state.totalPages = res.Pages }, () => {
    console.log(this.state.Products);
  });
  
})  
}

searchProductByPageByCategory = (e) => {
  fetch('http://localhost:8000/products?page=1&category=' + e.target.value)
  .then(res => res.json())
  .then(res => {
    //let searchResult = JSON.parse(responseBody).results;
    console.log(res);
    this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages }, () => {
      console.log(this.state.Products);
      console.log(this.state.totalPages);
    });
    
  })  
  }

  searchProductByPrice = (event) => {
    fetch('http://localhost:8000/products?page=&price=' + event.target.value)
    .then(res => res.json())
    .then(res => {
      //let searchResult = JSON.parse(responseBody).results;
      console.log(res);
      this.setState({Products: this.state.Products = res.Products, totalPages: this.state.totalPages = res.Pages }, () => {
        console.log(this.state.Products);
      });
      
    })  
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
         
       
          
          <SearchBarProduct SearchProducts={this.searchProductByPage} />  
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
