import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const CategoryFilter = ({ categories, sortedByPrice, fetchProducts }) => {
  const Select = (props) => {
    const renderCategory = (category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    );
  
    if (props.options !== undefined) {
      return (
        <select {...props.input}>
          <option value=''>All Categories</option>
          {props.options.map(c => renderCategory(c))}
        </select>
      )
    }
    
    return <div></div>
  }

  const handleSubmit = (e) => {
    //clicking on 'all categories' sets get request to
    // 'category=""', which server returns all products
    fetchProducts({
      page: 1,
      category: e.target.value,
      price: sortedByPrice
    });
  };

  return(
    <div className='col-md-4 text-center'>
      <form onChange={e => handleSubmit(e)}>
        <Field 
          name='categoryFilter'
          label='Category Filter'
          component={Select}
          options={categories}
        />
      </form>
    </div>
  );
};



const selectCategoryForm = reduxForm({
  form: 'selectCategory'
})(CategoryFilter);

export default connect(null, null)(selectCategoryForm);