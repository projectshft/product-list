import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { Typeahead } from 'react-bootstrap-typeahead';

import { addCategory } from '../actions/index';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { category: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(selectedOption) {
    console.log(selectedOption[0].categoryName);
    this.setState({ category: selectedOption[0].categoryName});
    this.props.addCategory(selectedOption[0].categoryName);
  }

  

  render() {
    return (
      <Typeahead
        id="category-dropdown"
        labelKey={(option) => `${option.categoryName}`}
        options={[
          { categoryName: 'Toys'},
          { categoryName: 'Garden'},
          { categoryName: 'Sports'},
          { categoryName: 'Movies'},
          { categoryName: 'Games'},
          { categoryName: 'Jewelry'}
        ]}
        onChange={this.handleInputChange}
        placeholder="Categories"
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addCategory: category => dispatch(addCategory(category))
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

export default connect(
  null,
  mapDispatchToProps
)(Categories);