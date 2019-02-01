// import { Switch, Route} from 'react-router-dom';
import React, { Component } from 'react';
// import Routes from './Routes';
import SearchBarProduct from './SearchBarProduct';
import ProductList from './ProductList'
import SearchBarCategory from './SearchBarCategory';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Products: []       
    }
  
}

searchProductByPage = (event) => {
fetch('http://localhost:8000/products?page='+ event.target.value)
.then(response => response.json())
.then(response => {
  //let searchResult = JSON.parse(responseBody).results;
  console.log(response);
  this.setState({ Products: response }, () => {
    console.log(this.state.Products);
  });
  
})  
}

searchProductByPageByCategory = (e) => {
  fetch('http://localhost:8000/products?page=1&category=' + e.target.value)
  .then(response => response.json())
  .then(response => {
    //let searchResult = JSON.parse(responseBody).results;
    console.log(response);
    this.setState({ Products: response }, () => {
      console.log(this.state.Products);
    });
    
  })  
  }

  render() {
    return (
      <div className="App">
         <h1>Products</h1>
        <div>
          <SearchBarProduct SearchProducts={this.searchProductByPage} />  
                  
          <ProductList Products={this.state.Products} />    
        </div>   
      </div>
    );
  }
}

export default App;
