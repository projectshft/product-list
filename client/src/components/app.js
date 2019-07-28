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

        this.state = {
            query: '',
            category: null,
            sort: null,
            pageNumber: null
        };

        this.onSearchEnter = this.onSearchEnter.bind( this )
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
        if ( e.charCode == 13 ) {
            console.log('hello')
            this.setState({query: e.target.value});
            e.target.value = ''
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <div className="row">
                   <div className="col-md-4">
                       <p className="text-center">search: <input onKeyPress={this.onSearchEnter}/></p>
                   </div>
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
    return bindActionCreators( { fetchProducts }, dispatch )
};

export default connect( null, mapDispatchToProps )( App );


