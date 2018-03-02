import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../containers/header';
import ProductList from '../containers/product-list';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header />
                <Switch>
                    <Route exact path='/' component={ProductList} />
                </Switch>
            </div>
        )
    }
}