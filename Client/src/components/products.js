import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import _ from 'lodash'


class Products extends Component {
  constructor() {
    super();
    // this.state = {
    //   currentPage: 1,
    //   currentSort: '',
    //   currentCategory: '',
    //   currentSearch: ''
    // }
 
  }
 
async componentDidMount() {
   await this.props.fetchProducts ()
   console.log(this.props.products.products)

    }

componentDidUpdate () {

}

    renderProducts() {
  
        return (
          _.map(this.props.products.products, p => {
         return (<div className="col-4 text-center" key={p._id}>
            <div className="item-name">{p.name}</div>
            <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg" alt="" width="240" height="auto" className="mx-auto d-block"></img>
            <div className="category">Category: {p.category}</div>
            <div className="price">${p.price}</div>
            <br/>
            <br/>
        </div>)
          })
          )
    
    }

    render() {
        return(
        <div className="row row-row-cols3">
            {this.renderProducts()}
             </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
function mapStateToProps({products}) {
 return {products}
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
