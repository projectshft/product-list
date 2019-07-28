import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

class PaginationFooter extends Component {
 
  renderPages(){
    let pageArray = [];
    //pushing numbers into an array because apparently react doesn't like a for loop to generate the component
    for(let i = 1; i <= this.props.totalPages; i++){
      pageArray.push(i);
    }
    //if statement to account for initialization of the store 
    if(pageArray.length != 0){
    return _.map(pageArray, num => {
      return(
        <li key={num} className='page-item page-link'>{num}</li>
     
      )
    })
  }
}

  render(){
    return (
      <div className='container'>
          <ul className='pagination justify-content-center'>
          {this.renderPages()}
          </ul>
      </div>
    )
    //generate page items based upon number returned from server after products update

  }
}

function mapStateToProps({ totalPages}){
  return { totalPages };
}

// // function mapDispatchToProps(dispatch){
// //   return bindActionCreators({ fetchProductsWithCategory, updateStoreCategory, fetchProductsWithSort, updateSortOrder }, dispatch);
// // }

export default connect(mapStateToProps, null)(PaginationFooter);