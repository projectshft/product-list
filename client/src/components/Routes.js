//To Connect to both the Server and Client sides simultaneously, you need to run node server.js for the whole folder(server) and npm start for the client folder, in two different terminals. 
import { Switch, Route } from 'react-router-dom'
import React from 'react';
import ProductList from './ProductList';

const Routes = ({Products}) => (
  //This gives us a route for the Product List to display. As you see above, to make it work, the ProductList component is imported and down below it is connected back to a route known as "/".
  <Switch>     
    <Route exact path='/' render={() => (
      <ProductList Products={Products} />
    )}/>      
  </Switch>
)

  export default Routes