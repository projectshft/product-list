import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

//need to get current category from redux form state

const SortOptions = ({ currentCategory, sortedByPrice, fetchProducts }) => {
  //almost the same as Select in CategoryFilter, possible refactor
  const Select = (props) => {
    return (
      <select {...props.input}>
        <option value=''>Sort by:</option>
        <option key='lowest' value='lowest'>Lowest Price</option>
        <option key='highest' value='highest'>Highest Price</option>
      </select>
    )
  }

  const handleSubmit = (e) => {
    fetchProducts({
      page: 1,
      category: currentCategory.categoryFilter,
      price: e.target.value
    });
  }

  return (
    <div className='col-md-4 text-center'>
      <form onChange={e => handleSubmit(e)}>
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