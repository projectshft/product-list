import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { getProducts } from '../actions/index';

class Search extends Component {

  // Allow for a placeholder in dropdowns
  onSubmit(query) {
    if (query.search) {
      if (query.category || query.price) {
        if (query.category !== 'Filter' && query.price !== 'Price') {
          this.props.getProducts({ ...query });
          search.values = query;
        } else if (query.category === 'Filter' && query.price !== 'Price') {
          if (query.price) {
            this.props.getProducts({ price: query.price, search: query.search });
            search.values = { price: query.price, search: query.search };
          } else {
            this.props.getProducts({ search: query.search });
            search.values = { search: query.search };
          }
        } else if (query.category !== 'Filter' && query.price === 'Price') {
          this.props.getProducts({ category: query.category, search: query.search });
          search.values = { category: query.category, search: query.search };
        } else {
          this.props.getProducts({ search: query.search });
          search.values = { search: query.search };
        }
      } else {
        this.props.getProducts({ search: query.search });
        search.values = { search: query.search };
      }
    } else {
      if (query.category || query.price) {
        if (query.category !== 'Filter' && query.price !== 'Price') {
          this.props.getProducts({ ...query });
          search.values = query;
        } else if (query.category === 'Filter' && query.price !== 'Price') {
          if (query.price) {
            this.props.getProducts({ price: query.price });
            search.values = { price: query.price };
          } else {
            this.props.getProducts();
            search.values = {};
          }
        } else if (query.category !== 'Filter' && query.price === 'Price') {
          this.props.getProducts({ category: query.category });
          search.values = { category: query.category };
        } else {
          this.props.getProducts();
          search.values = {};
        }
      } else {
        this.props.getProducts();
        search.values = {};
      }
    }
  }

  // To dynamically render the categories dropdown search
  renderCategories(category, idx) {
    return (<option key={idx} value={category}>{category}</option>)
  }

  render() {

    // Get categories for dynamically populating the categories dropdown
    let categories = this.props.products.categories;
    if (!categories) categories = [];

    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline">
          <Field
            name='search'
            className='form-control'
            placeholder='Search'
            component='input'
            type='text'
          />
          <div>
            <Field
              className='custom-select'
              name='category'
              component='select'
            >
              <option value='Filter'>Filter by Category</option>
              {categories.map((category, idx) => this.renderCategories(category, idx))}
            </Field>
          </div>
          <Field
            className='custom-select'
            name='price'
            component='select'>
            <option value='Price'>Sort by Price</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </Field>
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-search"></i>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ products, values }) {
  return { products, values };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getProducts }, dispatch);

const search = reduxForm({
  form: 'searchNew'
})(Search)

export default connect(mapStateToProps, mapDispatchToProps)(search);
