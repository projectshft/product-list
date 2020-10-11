import React, { Component } from 'react';

class SearchBar extends Component {

  render() {
    return (
      <span className='row' id='searchbox'>
        <form
          onSubmit={this.props.onSearchFormSubmit}
          className='input-group form-inline search'>
          <button type='submit' className='btn btn-secondary btn-sm'>
            Submit
          </button>
          <input
            className='form-control-sm'
            placeholder='Search for products'
            value={this.props.search}
            onChange={this.props.onSearchInputChange}
          />
        </form>
      </span>
    );
  }
}

export default SearchBar;
