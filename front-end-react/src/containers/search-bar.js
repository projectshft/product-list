import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log("search term: " + event.target.value);
    this.setState({ search: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.searchProducts(this.state.search);
    this.setState({ search: '' });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <form
            onSubmit={this.onFormSubmit}
            className='input-group form-inline search'>
            <span className='input-group-btn'>
              <button type='submit' className='btn btn-secondary btn-sm'>
                Submit
              </button>
            </span>
            <input
              className='form-control-sm'
              placeholder='Search for products'
              value={this.state.search}
              onChange={this.onInputChange}
            />
          </form>
        </div>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
