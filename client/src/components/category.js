import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchCategory, fetchProducts } from '../actions/index';

function CategorySearch(props){
  console.log('from category props: ', props)
      //const { products } = this.props
      const getCategory = (e) => {
        props.searchCategory(`&category=${ e.target.value }`)
        props.fetchProducts(props.searchRequests)
      }
      return (
        <div className='col'>
          <select onChange={getCategory} className="custom-select custom-select-sm">
            <option value="Categories">Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
            {/*props.map((item) => (
              <option value={`${item.category}`}>{`${item.category}`}</option>
            ))*/}
          </select>
        </div>
      )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchCategory, fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySearch);