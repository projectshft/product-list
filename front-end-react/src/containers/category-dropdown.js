import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchCategories } from '../actions/index';

const Categories = [
  { label: 'Tools', value: 'Tools' },
  { label: 'Garden', value: 'Garden' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Books', value: 'Books' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Health', value: 'Health' },
  { label: 'Jewelery', value: 'Jewelery' },
];

let selectedValue;

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { category: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log('selected value: ' + selectedValue);
    this.props.searchCategories(selectedValue);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <Select className='select-category'
              placeholder='Select category'
              value={Categories.find((cat) => cat.value === selectedValue)} // set selected value
              options={Categories} // set list of the data
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchCategories }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategoryDropdown);
