import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../containers/header';
import ProductList from '../containers/product-list';
import Product from '../containers/product';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Switch>
                    <Header>
                        <Route exact path='/' component={ProductList} />
                        <Route path='/:productId' component={Product} />
                    </Header>
                </Switch>
            </div>
        )
    }
}