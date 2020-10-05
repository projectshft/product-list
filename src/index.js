import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore} from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import reducers from "./reducers";
import Products from "./components/products";

import 'bootstrap/dist/css/bootstrap.css'


const store = createStore(reducers);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/products" component={Products} />
                        <Route exact path="/" component={Products} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    )
};

store.subscribe(() => {
    render();
})
render();