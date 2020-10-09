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
      console.log(
        'in cat container & this.state.category: ' + this.state.category
      );
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
          <option value='Baby'>Baby</option>
          <option value='Beauty'>Beauty</option>
          <option value='Books'>Books</option>
          <option value='Clothing'>Clothing</option>
          <option value='Computers'>Computers</option>
          <option value='Electronics'>Electronics</option>
          <option value='Games'>Games</option>
          <option value='Garden'>Garden</option>
          <option value='Grocery'>Grocery</option>
          <option value='Health'>Health</option>
          <option value='Home'>Home</option>
          <option value='Industrial'>Industrial</option>
          <option value='Jewelery'>Jewelery</option>
          <option value='Kids'>Kids</option>
          <option value='Music'>Music</option>
          <option value='Outdoors'>Outdoors</option>
          <option value='Shoes'>Shoes</option>
          <option value='Sports'>Sports</option>
          <option value='Tools'>Tools</option>
          <option value='Toys'>Toys</option>
        </select>
      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryDropdown);
