import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { fetchProducts } from '../actions'

class SearchBar extends Component {


  onSubmit(values) {
    this.props.fetchProducts({...values, page: 1});
  }

  //Using redux-form to get the values from the form and pass them to the reducer.  Should include
  //a string query, a category dropdown, and a price sort dropdown
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form-inline my-2">
            <Field
              label='Search'
              name='query'
              className='form-control'
              placeholder='Search'
              component='input'
              type='text'
            />
          <button type="submit" className="btn btn-outline-light mr-md-5 my-2 my-sm-0"><i className="fa fa-search"></i></button>
          <div>
            <Field
              label='Category'
              className='custom-select'
              name='category'
              placeholder='Category'
              component='select'>
                <option></option>
                <option value="Tools">Tools</option>
                <option value="Games">Games</option>
                <option value="Baby">Baby</option>
                <option value="Health">Health</option>
                <option value="Beauty">Beauty</option>
                <option value="Automotive">Automotive</option>
                <option value="Electronics">Electronics</option>
                <option value="Shoes">Shoes</option>
                <option value="Clothing">Clothing</option>
                <option value="Industrial">Industrial</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Sports">Sports</option>
                <option value="Grocery">Grocery</option>
                <option value="Home">Home</option>
                <option value="Garden">Garden</option>
                <option value="Kids">Kids</option>
            </Field>
          </div>
          <div className='ml-md-5'>
          <Field
              label='Price'
              className='custom-select'
              name='price'
              placeholder='Price'
              component='select'>
                <option placeholder="Sort By Price"></option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
            </Field>
          </div>
        </form>
      </div>
    )
  }
}



function mapStateToProps({ products, values }) {
  return { products, values };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

const searchBar = reduxForm({
  form: 'searchNew'
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);
