import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class SortProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { sort: '' };
    this.change = this.change.bind(this);
  }

  change(event) {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ sort: event.target.value }, function () {
      console.log('in sort container & this.state.sort = ' + this.state.sort);
      this.props.fetchProducts('', '', this.state.sort, '');
      //   console.log('back in sort after fetching products')
      // document.getElementById('dropdownsort').selectedIndex = 0;
      //   console.log("selectedindex: " + document.getElementById('dropdownsort').selectedIndex);
    });
  }

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group-dropdown'>
          <select
            id='dropdownsortandrefresh'
            value={this.state.sort}
            onChange={this.change}
            className='select-sort-order'>
            <option value='0'>Sort by price</option>
            <option value='lowest'>Price: low to high</option>
            <option value='highest'>Price: high to low</option>
          </select>
        </div>
        <button
          onClick={this.onBtnClick}
          className='btn btn-secondary btn-sm btn-refresh'>
          Reset all
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SortProducts);
