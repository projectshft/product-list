import React from 'react';
// import SearchBar from "./search-bar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { ResultsList } from "results-list";

class App extends React.Component {
    constructor(props) {
        super(props)
    };

    componentDidMount() {

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
                   <SearchBar />
                   <
                </div>
                <div className="row">
                    
                </div>
                <div className="row">
                    
                </div>
                <div className="row">
                    
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
