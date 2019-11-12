import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { searchProducts } from "../actions";

class SearchBar extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.searchProducts(values)
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }

}

function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts }, dispatch);
}

reduxForm({
    validate,
    form: 'SearchBar',
})(SearchBar);


export default connect(null, mapDispatchToProps)(newSearch);

