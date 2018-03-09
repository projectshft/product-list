import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions'
import ProductList from './product-list'

export class SearchBar extends Component {
	constructor (props) {
		super (props)
		this.state = {
			category: '',
			sortBy: '',
			pageNumber: 1,
			searchTerm: ''
		}
		this.onInputChange = this.onInputChange.bind(this)
	}

	onInputChange(event) {
		this.setState({ searchTerm: event.target.value })
	}

	onFormSubmit(event) {
		event.preventDefault()
		this.setState({pageNumber: 1}, () => {
			let searchTerm = this.state.searchTerm
			let category = this.state.category
			let sortBy = this.state.sortBy
			let pageNumber = this.state.pageNumber
			this.props.fetchProducts(searchTerm, category, sortBy, pageNumber)
		})
	}

	categoryChange(event) {
		this.setState({ category: event.target.value, pageNumber: 1 }, () => {
			let searchTerm = this.state.searchTerm
			let category = this.state.category
			let sortBy = this.state.sortBy
			let pageNumber = this.state.pageNumber
			this.props.fetchProducts(searchTerm, category, sortBy, pageNumber) 
		})
	}

	sortChange(event) {
		this.setState({ sortBy: event.target.value }, () => {
			let searchTerm = this.state.searchTerm
			let category = this.state.category
			let sortBy = this.state.sortBy
			let pageNumber = this.state.pageNumber
			this.props.fetchProducts(searchTerm, category, sortBy, pageNumber)
		})
	}

	pageButtonClick(page) {
		this.setState({ pageNumber: page }, () => {
			let searchTerm = this.state.searchTerm
			let category = this.state.category
			let sortBy = this.state.sortBy
			let pageNumber = this.state.pageNumber
			this.props.fetchProducts(searchTerm, category, sortBy, pageNumber)
		})
	}

	getCurrentPage () {
		return this.state.pageNumber
	}

	render () {
		//Fetch products on intial page load.
		if (!this.state.category && !this.state.sort && !this.state.searchTerm) {
			this.props.fetchProducts('','','','')
		}

		return (
			<div>
				<div className='text-center row main'>
					<div className='col-12'>
						<h1>Products</h1>
						<br></br>
						<div className='row'>
							<div className='col-6'>
								<form className='form-row' onSubmit={this.onFormSubmit.bind(this)}>
									<input
										className='col form-control'
										type='text'
										value={this.state.searchTerm}
										placeholder='Search products'
										onChange={this.onInputChange}
									/>
									<span className='col text-left'>
										<button type='submit' className='btn btn-primary'>Search</button>
									</span>
								</form>
							</div>
							<div className='col-6'>
								<form className='form-row' onSubmit={this.onFormSubmit.bind(this)}>						
									<select className='col form-control' value={this.state.category} onChange={this.categoryChange.bind(this)}>
										<option value=''>Filter by Category</option>
										<option value='Automotive'>Automotive</option>
										<option value='Beauty'>Beauty</option>
										<option value='Clothing'>Clothing</option>
										<option value='Computers'>Computers</option>
										<option value='Games'>Games</option>
										<option value='Music'>Music</option>
										<option value='Sports'>Sports</option>
										<option value='Toys'>Toys</option>
									</select>
									<select className='col form-control' value={this.state.sortBy} onChange={this.sortChange.bind(this)}>
										<option value=''>Sort by...</option>
										<option value='lowest'>Price: Low to High</option>
										<option value='highest'>Price: High to Low</option>
									</select>
								</form>
							</div>
						</div>
					</div>
				</div>
				<ProductList pageButtonClick = {this.pageButtonClick.bind(this)} getCurrentPage = {this.getCurrentPage.bind(this)} />
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchProducts }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
