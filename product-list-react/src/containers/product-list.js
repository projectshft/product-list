import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/index'
import { bindActionCreators } from 'redux'

//export each step as a div
class ProductList extends Component {

	renderProducts() {
		return this.props.products.map((product, index) => {
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

	render() {
		return (
			<div className='main row justify-content-center'>
				{this.renderProducts()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		products: state.response.products
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
