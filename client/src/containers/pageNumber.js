
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentPage, increment, decrement, fetchProductsByPage } from '../actions/actions';

class PageNumber extends Component {

    render() {

        return (
            <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" value="previous" onClick={(e) => { this.props.decrement() }}>Previous</button>
                <button type="button" className="btn btn-secondary" value="1" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>1</button>
                <button type="button" className="btn btn-secondary" value="2" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>2</button>
                <button type="button" className="btn btn-secondary" value="3" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>3</button>
                <button type="button" className="btn btn-secondary" value="4" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>4</button>
                <button type="button" className="btn btn-secondary" value="5" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>5</button>
                <button type="button" className="btn btn-secondary" value="6" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>6</button>
                <button type="button" className="btn btn-secondary" value="7" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>7</button>
                <button type="button" className="btn btn-secondary" value="8" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>8</button>
                <button type="button" className="btn btn-secondary" value="9" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>9</button>
                <button type="button" className="btn btn-secondary" value="10" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>10</button>
                <button type="button" className="btn btn-secondary" value="11" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>11</button>
                <button type="button" className="btn btn-secondary" value="12" onClick={(e) => { this.props.setCurrentPage(e.target.value) }}>12</button>
                <button type="button" className="btn btn-secondary" value="next" onClick={(e) => { this.props.increment() }}>Next</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.page
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setCurrentPage, increment, decrement, fetchProductsByPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(PageNumber);