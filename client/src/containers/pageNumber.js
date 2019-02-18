
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { setCurrentPage, increment, decrement, fetchProductsByPage } from '../actions/actions';

const PageNumber = ({dispatch}) => {

    return (
        <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" value="previous" onClick={() => {
                dispatch(decrement())
                dispatch(fetchProductsByPage())}}>Previous</button>
            <button type="button" className="btn btn-secondary" value="1" onClick={(e) => {
                dispatch(dispatch(setCurrentPage(e.target.value)))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>1</button>
            <button type="button" className="btn btn-secondary" value="2" onClick={(e) => {
                dispatch(dispatch(setCurrentPage(e.target.value)))                 
                dispatch(fetchProductsByPage(e.target.value))      }}>2</button>
            <button type="button" className="btn btn-secondary" value="3" onClick={(e) => {                             dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>3</button>
            <button type="button" className="btn btn-secondary" value="4" onClick={(e) => {                             dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>4</button>
            <button type="button" className="btn btn-secondary" value="5" onClick={(e) => {                               dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>5</button>
            <button type="button" className="btn btn-secondary" value="6" onClick={(e) => {                     dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>6</button>
            <button type="button" className="btn btn-secondary" value="7" onClick={(e) => {                             dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>7</button>
            <button type="button" className="btn btn-secondary" value="8" onClick={(e) => {                             dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>8</button>
            <button type="button" className="btn btn-secondary" value="9" onClick={(e) => {                             dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>9</button>
            <button type="button" className="btn btn-secondary" value="10" onClick={(e) => {                     dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>10</button>
            <button type="button" className="btn btn-secondary" value="11" onClick={(e) => {                            dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>11</button>
            <button type="button" className="btn btn-secondary" value="12" onClick={(e) => {                            dispatch(setCurrentPage(e.target.value))                     
                dispatch(fetchProductsByPage(e.target.value))                 }}>12</button>

            <button type="button" className="btn btn-secondary" value="next" onClick={(e) => {
                dispatch(increment())
                dispatch(fetchProductsByPage()) }}>Next</button>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        page: state.page
    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ setCurrentPage, increment, decrement}, dispatch);
// }
// mapDispatchToProps
export default connect(mapStateToProps, )(PageNumber);