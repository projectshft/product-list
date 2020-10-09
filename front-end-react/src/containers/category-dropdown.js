import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { category: '' };

    this.change = this.change.bind(this);
  }

  change(event) {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ category: event.target.value }, function () {
      console.log('in cat container & this.state.category: ' + this.state.category);
      this.props.fetchProducts('', this.state.category, '', '');
    });
  }

  render() {
    return (
          <span>
            <select
              id='categories'
              className='select-category'
              placeholder='Select category'
              value={this.state.category}
              onChange={this.change}>
              <option defaultValue>Select a category</option>
              <option value='Tools'>Tools</option>
              <option value='Garden'>Garden</option>
              <option value='Shoes'>Shoes</option>
              <option value='Books'>Books</option>
              <option value='Clothing'>Clothing</option>
              <option value='Health'>Health</option>
              <option value='Jewelery'>Jewelery</option>
            </select>
          </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryDropdown);
