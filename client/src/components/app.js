import React, { Component } from 'react';
import SearchBar from "./search-bar";
import Categories from "./categories";
import Sort from "./sort"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ResultsList from "./results-list";
import PageNumbers from "./page-numbers";
import { fetchProducts } from "../actions/index";

export let categoryHeader = "";
export let sortHeader = ""

class App extends Component {
    constructor(props) {
        super(props)

        //local state is maintained on this component to keep track of the client's request settings (i.e. search input, category, sort, pageNumber) to combine all of those parameters in a single get request query.
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

    //the initial fetch request for all the products in the databse is made when this component first mounts
    componentDidMount() {
        this.props.fetchProducts({
            category: null,
            sort: null
        })
    };

    //whenver there is a change to the local state, the fetchProdducts function will run to make a get request for matching products
    componentDidUpdate() {
        this.props.fetchProducts(this.state)

    }
 
    //this function sets the local state's query parameter with the value of input field upon a "return" keypress.
    onSearchEnter(e) {
        if ( e.charCode === 13 ) {
            this.setState({query: e.target.value});
            e.target.value = ''
        }
    }

    //this function sets the local state's 'category' property upon a user click of the dropdown category button
    selectCategory(e) {
        this.setState( { category: e.target.id, pageNumber: 1 })
        categoryHeader = e.target.id
        
    }

    //this function sets the sort property arranging the products in order of price- either ascendind or descending.  It defaults to an empty string.
    selectSort(e) {
        e.target.id === "Price: High to Low" ? this.setState({ sort: "descending"}) :
        e.target.id === "Price: Low to High" ? this.setState({ sort: "ascending"}) :
        this.setState({ sort: "" });

        this.setState({ pageNumber: 1 })
    
        sortHeader = e.target.id
    }

    //this functoin sets the pageNumber propety of the local state based on the clicks on the pageNumbers at the bottom of the screen
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

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { fetchProducts }, dispatch )
};

export default connect( null, mapDispatchToProps )( App );


