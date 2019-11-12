import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class SearchBar extends Component {
  componentDidMount() {
    //default load the page
    this.onSubmit({ query: "" });
    console.log("searchbar component mounted");
  }

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
    this.props.fetchProducts({
      query: values.query,
      category: this.props.products.category,
      sort: this.props.products.sort,
      page: 1
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="search-container">
        <form
          className="search-bar"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
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
function mapStateToProps({ products }, ownProps) {
  return { products };
}

function validate(values) {
  // console.log(values) -> { query: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  // if (!values.query) {
  //   errors.query = "Search Can't Be Blank";
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
  mapStateToProps,
  mapDispatchToProps
)(postNewPost);
