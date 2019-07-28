import React from 'react';
import SearchRow from "./search-row";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ResultsList from "./results-list";
import PageNumbers from "./page-numbers";
import { fetchProducts } from "../actions/index";

class App extends React.Component {
    constructor(props) {
        super(props)
    };

    componentDidMount() {
        let response = fetchProducts({
            category: 'Grocery',
            sort: null
        })
        console.log('this is my response:' + response)
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <div className="row">
                   <SearchRow />
                </div>
                <div className="row">
                    <ResultsList />
                </div>
                <div className="row">
                    <PageNumbers />
                </div>
                
            </div>

        )
    };
};

// function mapStateToProps( state {

// })

function mapDispatchToProps( dispatch ) {

};

export default App

// connect( mapStateToProps, mapDispatchToProps )( App );
