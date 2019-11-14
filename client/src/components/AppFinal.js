import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts} from '../actions';
import CategoryFilter from './CategoryFilter';
import Sort from './Sort';
import Pagination from './Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';

class AppFinal extends Component {
   
    componentDidMount() {
        //keeping consistent with actions
        let page = this.props.page
        let category = this.props.category
        let sort = this.props.sort
        this.props.fetchProducts(page, category, sort)
    }

    renderProducts() {
        return _.map(this.props.products.productItems, product => {
          return (
            <div className='product-item' key={product._id}>
              <div className="justify-content-center"> Category: {product.category}</div>
              <div className="justify-content-center"> Price: ${product.price} </div>
              <div className="card">
                 <img className="card-img-top" src={product.image} alt="test"/>
              <h1 className = 'product-name'> {product.name} </h1>
            </div>
        </div>
          )
        })
      }
    

    render() {
        return (
            <div className = 'container'>
             <h1 className='page-title' class='justify-center'> Product List </h1>
                <div className = 'row'>   
                    <div className ='col-md-4'>
                    <CategoryFilter />
                    <br>
                    </br>
                    <Sort />
                    <br>
                    </br>
                    </div>
                </div>
                <div className = 'products-container row'>
                    {this.renderProducts()}
                </div>
                <Pagination />
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {products: state.products, category: state.category, sort: state.sort, page: state.page}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFinal)