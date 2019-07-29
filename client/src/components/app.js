import React, { Component } from 'react';
import SearchBar from "./search-bar";
import Categories from "./categories";
import Sort from "./sort"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ResultsList from "./results-list";
import PageNumbers from "./page-numbers";
import { fetchProducts } from "../actions/index";

export let categoryHeader = "CATEGORIES";
export let sortHeader = "SORT"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            category: null,
            sort: null,
            pageNumber: null
        };

        this.onSearchEnter = this.onSearchEnter.bind( this );
        this.selectCategory = this.selectCategory.bind( this );
        this.selectSort = this.selectSort.bind( this );
        this.selectPageNumber = this.selectPageNumber.bind( this );
    };

    componentDidMount() {
        this.props.fetchProducts({
            category: null,
            sort: null
        })
    };

    componentDidUpdate() {
        console.log(this.state)
        // this.props.fetchProducts(this.state)

    }

    onSearchEnter(e) {
        if ( e.charCode === 13 ) {
            this.setState({query: e.target.value});
            e.target.value = ''
        }
    }

    selectCategory(e) {
        this.setState( { category: e.target.id })
        categoryHeader = e.target.id
        console.log(categoryHeader)
    }

    selectSort(e) {
        if (e.target.id === "Price: High to Low") {
            this.setState({ sort: "descending"})
        } else {
            this.setState({ sort: "ascending"})
        }
    
        sortHeader = e.target.id
    }

    selectPageNumber(e) {
        this.setState({ pageNumber: Number(e.target.id) })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center mt-4 mb-4">
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <div className="row">
                    <SearchBar onSearchEnter={this.onSearchEnter} />
                    <Categories selectCategory={this.selectCategory}/>
                    <Sort selectSort={this.selectSort}/>
                   
                </div>
                <div className="row">
                    <ResultsList />
                </div>
                <div className="row">
                    <PageNumbers selectPageNumber={this.selectPageNumber}/>
                </div>
                
            </div>

        )
    };
};

// function mapStateToProps( state {

// })

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { fetchProducts }, dispatch )
};

export default connect( null, mapDispatchToProps )( App );


