import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

//need to get current category from redux form state

const SortOptions = () => (
  <div>sortoptions placeholder</div>
);

function mapStateToProps(state) {
  return {
    currentCategory: getFormValues('selectCategory')(state)
  }
}

export default connect(mapStateToProps)(SortOptions);