
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCategory, fetchProducts} from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

class CategoryFilter extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
          //template from bootstrap dropdowns
            < div className="btn-group" >
                <button type="button" className="btn btn-primary justify-content-center" >Categories</button>
                <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split justify-content-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="sr-only">Dropdown</span>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Games">Games</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Health">Health</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Clothing">Clothing</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Home">Home</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Electronics">Electronics</a>
                    <a className="dropdown-item" href="http://localhost:8000/products?page=1&category=Outdoors">Outdoors</a>
                </div>
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {products: state.products, category: state.category, sort: state.sort}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({saveCategory, fetchProducts}, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(CategoryFilter);