import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onInputChange(event) {
    console.log('search term: ' + event.target.value);
    this.setState({ search: event.target.value });
    console.log('this.state.search: ' + this.state.search);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchProducts(this.state.search, '', '', '');
    this.setState({ search: '' });
  }

  onBtnClick() {
    this.props.fetchProducts('', '', '', '');
    //HOW TO return dropdowns to their default values?
  }

  render() {
    return (
      <span className='row' id='searchbox'>
        <form
          onSubmit={this.onFormSubmit}
          className='input-group form-inline search'>
          <button type='submit' className='btn btn-secondary btn-sm'>
            Submit
          </button>
          <input
            className='form-control-sm'
            placeholder='Search for products'
            value={this.state.search}
            onChange={this.onInputChange}
          />
        </form>
      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
