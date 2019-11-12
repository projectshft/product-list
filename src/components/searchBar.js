import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { searchProducts } from "../actions";


// This component renders a search bar for the user to query from 
class SearchBar extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" placeholder="Search for other categories"{...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        this.props.searchProducts(values.categories)
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
const newSearch = reduxForm({
    validate,
    form: 'SearchBar',
})(SearchBar);


export default connect(null, mapDispatchToProps)(newSearch);

