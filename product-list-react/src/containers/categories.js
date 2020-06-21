import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { Typeahead } from 'react-bootstrap-typeahead';

import { addCategory } from '../actions/index';
import { addPage } from '../actions/index';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { category: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.value);
    let category = "";
    if (event.target.value !== 'Categories') {
      this.setState({ category: event.target.value});
      this.props.addCategory(event.target.value);
      category = event.target.value;
    } else {
      this.setState({ category: ""})
      this.props.addCategory("");
    }
    this.props.addPage(1);
    this.props.fetchProducts(this.props.searchTerm, category, this.props.sortBy);
  }



  // render() {
  //   return (
  //     <Typeahead
  //       id="category-dropdown"
  //       labelKey={(option) => `${option.categoryName}`}
  //       options={[
  //         { categoryName: 'Toys'},
  //         { categoryName: 'Garden'},
  //         { categoryName: 'Sports'},
  //         { categoryName: 'Movies'},
  //         { categoryName: 'Games'},
  //         { categoryName: 'Jewelry'}
  //       ]}
  //       onChange={this.handleInputChange}
  //       placeholder="Categories"
  //     />
  //   );
  // }
  render() {
    return (
      <select class="browser-default custom-select" onChange={this.handleInputChange}>
        <option selected>Categories</option>
        <option value="Toys">Toys</option>
        <option value="Garden">Garden</option>
        <option value="Sports">Sports</option>
        <option value="Movies">Movies</option>
        <option value="Games">Games</option>
        <option value="Jewelery">Jewelery</option>
      </select>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: category => dispatch(addCategory(category)),
    fetchProducts: (searchTerm, category, sortBy) => dispatch(fetchProducts(searchTerm, category, sortBy)),
    addPage: (page) => dispatch(addPage(page))
  }
}


function mapStateToProps(state) {
  console.log('categories state: ' + state.searchTerm)
  return {
    searchTerm: state.searchTerm,
    category: state.category,
    sortBy: state.sortBy,
    page: state.page
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);