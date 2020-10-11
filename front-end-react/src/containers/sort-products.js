import React, { Component } from 'react';

class SortProducts extends Component {

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group-dropdown'>
          <select
            id='dropdownsortandrefresh'
            value={this.props.sort}
            onChange={this.props.setSort}
            className='select-sort-order'>
            <option value='0'>Sort by price</option>
            <option value='lowest'>Price: low to high</option>
            <option value='highest'>Price: high to low</option>
          </select>
        </div>
        <button
          onClick={this.props.onRefreshBtnClick}
          className='btn btn-secondary btn-sm btn-refresh'>
          Reset all
        </button>
      </form>
    );
  }
}

export default SortProducts;
