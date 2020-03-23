import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import _ from 'lodash'

//this component renders the products and the pagination 
class Products extends Component {
  constructor() {
    super();
    this.state =  { currentPage: 'page=1'}

    this.handleClickForPagination = this.handleClickForPagination.bind(this)
}

 //fetches products when page loads 
async componentDidMount() {
  await this.props.fetchProducts ()
  console.log(this.props.products.products)

   }


//the helper function for when you click the page 
handleClickForPagination() {
  this.props.fetchProducts(this.state.currentPage)
}


//renders page numbers
renderPageNumbers() {
    
    let pageNumbers = [];
    let count = this.props.products.count 
    
    for (let i = 1; i <= Math.ceil((count/9)) ; i++) {
      pageNumbers.push(i)
       }

     const pageNumbersList = pageNumbers.map(number => {
        return (
            <li className="page-link text-center"
              key={number} 
              value={number} 
              onClick={event=> this.setState({ currentPage:  'page=' + event.target.value }, () => {this.handleClickForPagination()})}>
              {number}
              </li>
        );
      });
      return pageNumbersList

    }



    renderProducts() {
  
        return (
          //uses lodash map property bc products prop is an object 
          _.map(this.props.products.products, product => {
         return (
         <div className="col-4 text-center" key={product._id}>
            <div className="category">Category: {product.category}</div>
            <div className="price">${product.price}</div>
           
            <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg" alt="" width="240" height="auto" className="mx-auto d-block"></img>
            <div className="item-name">{product.name}</div>
            <br/>
            <br/>
        </div>)
          })
          )
    
    }

    render() {
        return(
        <div className="row row-row-cols3 text-center">
            {this.renderProducts()}
            {this.renderPageNumbers()}
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
function mapStateToProps(state) {
 return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
