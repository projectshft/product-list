import React, { Component } from 'react';
import { Redirect} from "react-router-dom";

//If the user navigates the 'home page'
//Redirect them to the /contacts/ page
class Home extends Component {
  render() {
    return (
      <Redirect to="/products" />
    );
  }
}

export default Home;