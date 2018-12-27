import React, { Component } from 'react';
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SearchBar from './components/search_bar';

class App extends Component {
  constructor(props) {
  super(props)

  this.state = { products: [] }
  }

  componentDidMount() {
    fetch('/api/products?page=1')
      .then(res => res.json())
      .then(products => this.setState({ products }, () => console.log('Products fetched :', products)));
  }


  render() {
    return (
      <div className="App container container-fluid">
          <h1 id="heading">
          PRODUCTS
          </h1>
          <div className="row">
            < SearchBar />
            <ul>
              {this.state.products.map(product =>
                <li key={product._id}>{product.name}</li>
                )}
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
