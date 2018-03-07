import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/index'
import { bindActionCreators } from 'redux'


class ProductList extends Component {

	renderProducts() {
		return this.props.response.products.map((product, index) => {
			let productNode = null
			productNode = (
				<div className='col-4 align-items-center text-center product-main' key={index}>
					<div className='row'>
						<div className='col-11 product-col border border-primary rounded'>
							<div className='row product-inner'>
								<div className='col-8 text-left'>
									<p>Category: {product.category}</p>
								</div>
								<div className='col-4 text-left'>
									<h5>${product.price}</h5>
								</div>
							</div>
							<img className='img img-fluid' src={product.image} alt={product.name} />
							<h5>{product.name}</h5>
						</div>
					</div>
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
			for (let i = 1; i <= pages; i++) {
				pageNumbers.push(i)
			}
			return pageNumbers.map( page => {
				let pageButton = null
				let currentPage = this.props.getCurrentPage()
				//If the button being rendered matches our current page number, render it as selected.
				if (page === currentPage) {
					pageButton = (
						<button key={page} className='btn btn-link buttonSelected' disabled onClick={
							() => { this.props.pageButtonClick(page) }
						}>
							{page}
						</button>
					)
				} else {
					pageButton = (
						<button key={page} className='btn btn-link' onClick={
							() => { this.props.pageButtonClick(page) }
						}>
							{page}
						</button>
					)
				}
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
