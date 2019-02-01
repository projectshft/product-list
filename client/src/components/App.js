// import { Switch, Route} from 'react-router-dom';
import React, { Component } from 'react';
// import Routes from './Routes';
import SearchBarProduct from './SearchBarProduct';
import ProductList from './ProductList'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        Products: [],
      
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
    this.setState({ Products: this.state.Products.concat(res) }, () => console.log('CURRENT TRAVEL LIST: ', this.state.Product))               
  })

 
}

searchProductByPage = (event) => {
fetch('http://localhost:8000/products?page='+ event.target.value)
.then(response => response.json())
.then(response => {
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
