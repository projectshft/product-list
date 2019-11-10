import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class SearchBar extends Component {
  renderField(field) {
    return (
      <div>
        <div className="input-wrapper">
          <input placeholder="Search" type="text" {...field.input} />
        </div>
        <button type="submit">Search</button>
      </div>
    );
  }

  onSubmit(values) {
    this.props.fetchProducts(values.query);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="search-container">
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          style={{ width: "100%" }}
        >
          <Field name="query" component={this.renderField} />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

function validate(values) {
  // console.log(values) -> { query: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  // if (!values.query) {
  //   errors.query = "Enter a location";
  // }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

const postNewPost = reduxForm({
  validate: validate,
  form: "postNew"
})(SearchBar);

export default connect(
  null,
  mapDispatchToProps
)(postNewPost);
