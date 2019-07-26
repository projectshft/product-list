import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class App extends Component {
  //   state = {
  //     data: []
  //   };

  //   componentDidMount() {
  //     // Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res[0].name }))
  //     .catch(err => console.log(err));
  // }
  //   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/products');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // };

  //   render() {
  //     return (
  //       <div className="App">
  //         <header className="App-header blah">
  //           <h1 className="App-title">{this.state.data} hello</h1>
  //         </header>
  //       </div>
  //     );
  //   }

  componentDidMount() {
    this.props.fetchProducts()
  }

  renderList() {
    return this.props.products.map(product => {
      return (
        <li key={product._id} className="list-group-item">
          {products.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }

}


function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);