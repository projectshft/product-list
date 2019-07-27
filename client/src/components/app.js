import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, fetchCategories, fetchSort, fetchCategoriesAndSort } from '../actions';
import Searchbar from './searchbar';
import Filter from './filter';
import Sort from './sort';

class AppIndex extends Component {
    //once the components mounts to the DOM populate the store with data
    componentDidMount() {
        this.props.fetchProducts()
    }

    handleClick () {
        let category = this.props.category
        let sort = this.props.sort
        //if sort and category are specified fetch products based on these queries
        if (sort && category) {
        this.props.fetchCategoriesAndSort(sort, category)
        //if only sort is defined fetch products by search query
        } else if (sort) {
            this.props.fetchSort(sort)
        } else if (category) {
        //if only category is defined fetch products by category query
            this.props.fetchCategories(category)
        } else {
        //if no queries are specifed fetch products with no specifications
            this.props.fetchProducts()
        }

    }

    renderProducts() {
         return this.props.products.map(product => {
            return (
                //make 3 rows of 3 for the products return from the url
                <div className = 'col-md-4'>
                   <div className = 'row'>
                       <div className = 'col-sm-8'>
                           Category: {product.category}
                       </div>
                       <div className = 'col-sm-4'> 
                            $ {product.price}
                       </div>
                   </div>
                    <div className="card">
                        <img className="card-img-top" src='https://i.ytimg.com/vi/cav9yTlLLVI/hqdefault.jpg'/>
                        <div className="card-body">
                            <h1> {product.name} </h1>
                        </div>
                    </div>
                </div>

            )
        })
        
        
    }

    render() {
        return (
            <div className = 'container'>
             <h1 className='title'> Products<button onClick = {this.handleClick.bind(this)}>Get new products</button> </h1>
                <div className = 'row'>   
                    <div className ='col-md-4'>
                        <Searchbar />
                    </div>
                    <div className ='col-md-4'>
                        <Filter />
                    </div>
                    <div className ='col-md-4'>
                         <Sort />
                    </div>
                </div>
                <div className = 'row'>
                    {this.renderProducts()}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {products: state.products, category: state.category, sort: state.sort}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchProducts, fetchCategories,fetchSort, fetchCategoriesAndSort}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)

