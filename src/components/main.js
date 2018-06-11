import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from '../actions/requestConfig';
import {fetchProducts} from '../actions/fetch';

class Header extends Component {
    constructor(props) {
      super(props);
    }
}

function mapStateToProps({requestConfig, products}){
    return {requestConfig, products}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setPage, fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)