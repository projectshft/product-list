import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

//need to get current category from redux form state

const SortOptions = ({ currentCategory, sortedByPrice, fetchProducts }) => {
  //almost the same as Select in CategoryFilter, possible refactor
  const Select = (props) => {
    return (
      <select {...props.input}>
        <option value=''>None</option>
        <option key='lowest' value='lowest'>Price: Low to High</option>
        <option key='highest' value='highest'>Price: High to Low</option>
      </select>
    )
  }

  const handleSubmit = (e) => {
    let categoryRequest = (currentCategory) ? currentCategory.categoryFilter : '';
    fetchProducts({
      page: 1,
      category: categoryRequest,
      price: e.target.value
    });
  }

  return (
    <div className='col-md-4'>
      <form className='float-right' onChange={e => handleSubmit(e)}>
        <span className='mr-1'>sort by:</span> 
        <Field
          name='sortOptions'
          label='sortOptions'
          component={Select}
        />
      </form>
    </div>
  )

};

function mapStateToProps(state) {
  return {
    currentCategory: getFormValues('selectCategory')(state)
  }
}

const sortOptionsForm = reduxForm({
  form: 'sortOptions'
})(SortOptions)

export default connect(mapStateToProps, null)(sortOptionsForm);