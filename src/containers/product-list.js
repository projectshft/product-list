import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.props.fetchProducts();

        this.state = {
            page: 1
        }
        console.log(this.state);
    }

    renderProducts() {
        return this.props.products.products.map( product => {
            return (
                <Link to={`/${product._id}`} className="col text-center products" key={product._id}>
                    <img className="product-image" src={product.image} alt="" />
                    <h3 className="link">{product.name}</h3>
                    <h5 className="link">{product.category}</h5>
                    <h6 className="link">${product.price}</h6>
                </Link>
            )
        })
    }

    onPageButtonClick = (event) => {
        console.log(event.target.value);

        if (this.state.page == event.target.value) {
            return;
        }

        this.setState({ page: event.target.value });
        console.log(this.state.page);
        this.props.fetchProducts(null, null, null, event.target.value);
        this.renderProducts();
        console.log(this.state);
    }

    renderPagination() {
        return (
            <div>
                <div className="row justify-content-center">
                    <button onClick={this.onPageButtonClick} value="1" className="btn-link">1</button>
                    <button onClick={this.onPageButtonClick} value="2" className="btn-link">2</button>
                    <button onClick={this.onPageButtonClick} value="3" className="btn-link">3</button>
                    <button onClick={this.onPageButtonClick} value="4" className="btn-link">4</button>
                    <button onClick={this.onPageButtonClick} value="5" className="btn-link">5</button>
                    <button onClick={this.onPageButtonClick} value="6" className="btn-link">6</button>
                    <button onClick={this.onPageButtonClick} value="7" className="btn-link">7</button>
                    <button onClick={this.onPageButtonClick} value="8" className="btn-link">8</button>
                    <button onClick={this.onPageButtonClick} value="9" className="btn-link">9</button>
                    <button onClick={this.onPageButtonClick} value="10" className="btn-link">10</button>
                </div>
            </div>
        )
    }

    render() {
        if (!this.props.products.products) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="row">
                    {this.renderProducts()}
                </div>
                <div>
                    {this.renderPagination()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchProducts}, dispatch)
}

const mapStateToProps = (products) => {
    return products;
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);