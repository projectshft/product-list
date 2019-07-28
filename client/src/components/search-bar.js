import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

class SearchBar extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="col-md-4">
                <p className="text-center">search: <input onKeyPress={this.props.onSearchEnter}/></p>
            </div>
        )
    }
};

export default SearchBar