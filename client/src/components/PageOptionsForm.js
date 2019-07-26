import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
//import some actions here

class PageOptionsForm extends Component {

  //do some things here
  onSubmit(values){
    
  }
  render() {
    const { handleSubmit } = this.props;

    return(
     
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
          <label>Search</label>
              <Field
                name='search'
                component='input'
                type='text'
              />
              </div>
          <div className='col-md-4 text-right'>
          <label>Filter by Category:</label>
          <Field name='filter' component='select'>
            <option />
            <option>Kids</option>
            <option>Electronics</option>
            <option>Garden</option>
          </Field>
          </div>
          <div className='col-md-4 text-right'>
          <label>Sort by:</label>
          <Field name='filter' component='select'>
            <option />
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </Field>
          </div>
          </div>
        </div>
      </form>
     
    );
  }
}

function mapDispatchToProps(dispatech){
  return bindActionCreators({})
}

const updatePageOptions = reduxForm({
  form: 'PageOptionsForm',
})(PageOptionsForm);

export default connect(null, mapDispatchToProps)(updatePageOptions);