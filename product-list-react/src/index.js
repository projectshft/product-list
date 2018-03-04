import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import reducers from './reducers'

import ProductList from './containers/product-list'
import SearchBar from './containers/search-bar'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const store = createStoreWithMiddleware(reducers)

const App = () => {
	return (
		<div className='container-fluid main'>
			<SearchBar />
			<ProductList />
		</div>
	)
}


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'))