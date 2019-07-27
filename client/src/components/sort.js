import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSorter } from '../actions'
import { bindActionCreators } from 'redux';

class Sort extends Component {

    handleClick(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.props.addSorter(e.target.value);
    }

    render() {
        return (
        <button value= 'Hight' onClick={this.handleClick.bind(this)}>
            Price High
        </button>
        )
    }
}




function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSorter }, dispatch);
}

export default connect (null, mapDispatchToProps)(Sort);