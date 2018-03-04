import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/index'
import { bindActionCreators } from 'redux'


class ProductList extends Component {

	renderProducts() {
		return this.props.response.products.map((product, index) => {
			let productNode = null
			productNode = (
				<div className='col-4 align-items-center text-center border border-primary rounded' key={index}>

					<div className='row'>
						<div className='col'>
							<p>Category: {product.category}</p>
						</div>
						<div className='col text-right'>
							<h4>${product.price}</h4>
						</div>
					</div>
					<img className='img img-fluid' src={product.image} alt={product.name} />
					<h2>{product.name}</h2>
				</div>
			)
			return productNode
		})
	}

	renderPaginationButtons() {
		let count = this.props.response.count
		if (count >= 9) {
			let pages = count / 9
			// if there is a remainder, we'll need one extra page.
			if (count % 9) {pages += 1}

			//create an array of page numbers
			let pageNumbers = []
			for (let i = 1; i <=pages; i++) {
				pageNumbers.push(i)
			}
			return pageNumbers.map( page => {
				let pageButton = null
				pageButton = (
					<button className='btn btn-link' key={page} onClick={() => { this.props.onButtonClick(page)}}>
						{page}
					</button>
				)
				return pageButton
			})
		}
	}

	render() {
		return (
			<div>
				<div className='main row justify-content-center'>
					{this.renderProducts()}
				</div>
				<div className='row'>
					<div className='col text-center'>
						{this.renderPaginationButtons()}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		response: state.response
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
