import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setCategory } from '../actions/index';
import axios from 'axios';

class CategoryDropdown extends Component {
  constructor(props) {
    super(props);

    // The categories have local state for now
    this.state = {
      allCategories: [] // default sort param
    }
    this.selectCategoryFromMenu = this.selectCategoryFromMenu.bind(this);
  }

  componentDidMount() {

      let url = 'http://localhost:8000/categories';
    
      const request = axios.get(url);
      console.log("This is the categories request");
      console.log(request);
      this.setState({allCategories: request.data});
 }

  selectCategoryFromMenu (category, event) {
    event.preventDefault();

    this.props.setCategory(category);
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
    console.log(this.state.allCategories);
    return (
      <div>
        <div className="dropdown"><button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            Set Category
          </button>
          <div className="dropdown-menu">
            {this.state.allCategories.map(this.renderCategories)}
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
    category: state.category
  }; // and state.count
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setCategory }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDropdown);