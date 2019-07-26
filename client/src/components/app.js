import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'

class AppIndex extends Component {
    componentDidMount() {
        this.props.fetchProducts()
    }

    renderProducts() {
        return this.props.map(product => {
            <li> product </li>
        })
    }

    render() {
        return (
            this.renderProducts
        )
    }

}

function mapStateToProps(state) {
    return {products: state.products}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)

