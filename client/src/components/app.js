import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts} from '../actions';
import Searchbar from './searchbar';
import Filter from './filter';
import Sort from './sort';
import Page from './page'

class AppIndex extends Component {
    //once the components mounts to the DOM populate the store with data
    componentDidMount() {
        let page = this.props.page
        let category = this.props.category
        let sort = this.props.sort
        this.props.fetchProducts(page, category, sort)
    }

    // handleClick () {
    //     let page = this.props.page
    //     let category = this.props.category
    //     let sort = this.props.sort
    //     this.props.fetchProducts(page, category, sort)

    // }

    renderProducts() {
        //filter out count that is stored in the products prop
        let productsWithoutCount =this.props.products.filter(product => {
            return product.name
        }) 
         return productsWithoutCount.map(product => {
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
             <h1 className='page-title'> Products </h1>
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
                <Page />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)

