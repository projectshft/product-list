import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setSortOption } from '../actions/index';

class SortDropdown extends Component {
  constructor(props) {
    super(props);
    
    this.sortProducts = this.sortProducts.bind(this);
  }

  sortProducts = (option, event) => {
    event.preventDefault();

    // "None" resets the sortOption query param to null
    if (option === "none") {
      this.props.setSortOption(null);
      this.props.fetchProducts(this.props.searchTerm, null, this.props.category, this.props.page)
    } else {
    this.props.setSortOption(option);
    this.props.fetchProducts(this.props.searchTerm, option, this.props.category, this.props.page)
    }
  }

  // TODO: After dropdown selection, display active menu selection
  render() {
    return (
      <div>
        <div className="dropdown"><button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            Sort By Price
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item highest" type="button" onClick={event => this.sortProducts("highest", event)}>
              High to low
            </button>
            <button className="dropdown-item lowest" type="button" onClick={event => this.sortProducts("lowest", event)}>
              Low to high
              </button>
              <button className="dropdown-item none" type="button" onClick={event => this.sortProducts("none", event)}>
              (None)
              </button>
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
    category: state.category,
    page: state.page
  }; // and state.count, and state.sort, and state.filter...
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setSortOption }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortDropdown);