import { Switch, Route } from 'react-router-dom'
import React from 'react';
import ProductList from './ProductList';

const Routes = ({Products}) => (
  <Switch>     
    <Route exact path='/' render={() => (
      <ProductList Products={Products} />
    )}/>
    
    <Route path='/products' render={(Products) => (
      <ProductList Products={Products} />
    )}/>
      
  </Switch>
)

  export default Routes