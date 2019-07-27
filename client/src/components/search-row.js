import React from "react";
import SearchBar from "./search-bar";
import { connect } from "net";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index"

class SearchRow extends React.Component {
    constructor() {
        super()

        this.state = {
            query:'',
            category: null,
            sort: null,
            pageNumber: 1
        };

        this.onSearch = this.onSearch.bind( this );
        this.onCategoryChange = this.onCategoryChange.bind( this );
        this.onSortChange = this.onSortChange.bind( this )
    }

    onSearch( event ) {
        this.setState({ query: event.target.value })
    };

    onCategoryChange( event ) {
        this.setState({ category: event.target.value })
    };

    onSortChange( event ) {
        this.setState({ sort: event.target.value })
    }

    componentDidMount() {
        this.props.fetchProducts( this.state )
    }

    componentDidUpdate() {
        this.props.fetchProducts( this.state )
    }

    render() {
        return (
            <div>
                <SearchBar />

            </div>
        )
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators({ fetchProducts }, dispatch );
}

export default connect( null, mapDispatchToProps )( SearchRow );