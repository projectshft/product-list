import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setCategory, fetchCategories } from '../actions/index';

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    
    
    this.selectCategoryFromMenu = this.selectCategoryFromMenu.bind(this);
  }

  componentWillMount() {

    this.props.fetchCategories();

 }

  selectCategoryFromMenu = (category, event) => {
    event.preventDefault();
    this.props.setCategory(category);
    console.log("In our container, the category option is now")
    console.log(this.props.category);
    console.log("Now we fetch products")
    this.props.fetchProducts(this.props.searchTerm, this.props.sort, category)
  }

  renderCategories(categoryData) {
    
    return (
      <button className="dropdown-item" type="button" 
      onClick={event => this.selectCategoryFromMenu(categoryData, event)}>
      {categoryData}
    </button>
    );
  }


  render() {
    return (
      <div>
        <div className="dropdown"><button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            Set Category
          </button>
          <div className="dropdown-menu">
            {this.props.categories.map(this.renderCategories)}
          </div>
        </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {     
    searchTerm: state.searchTerm,
    sort: state.sort,
    categories: state.categories,
    category: state.category
  }; // and state.count, and state.sort, and state.filter...
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setCategory, fetchCategories }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDropdown);