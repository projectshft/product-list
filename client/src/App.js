import React, { Component } from 'react';
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

class App extends Component {
  constructor(props) {
  super(props)

  this.state = { products: [] }
  }

  componentDidMount() {
    fetch('/api/products?page=1')
      .then(res => res.json())
      .then(products => this.setState({ products }))
  //  )this.callApi()
  //   // .then(res => this.setState({ products: res.express}))
  //   .catch(err => console.log(err)
  }

  // callApi = async() => {
  //   const response = await fetch('/api/products?page=1');
  //   const body = await response.text();
  //   await this.setState({products: JSON.parse(body).results})

  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // }

  render() {
    console.log(this.state.products)
    return (
      <div className="App">
        <header className="App-header">
        <div className="row">
          <h1 className="col-md-2 col-md-offset-5">
          PRODUCTS
          </h1>
            <ul>
              {this.state.products.map(product =>
                <li key={product._id}>{product.name}</li>
                )}
            </ul>
        </div>
        </header>
      </div>
    );
  }
}

export default App;
