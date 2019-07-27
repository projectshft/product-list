import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSorter } from '../actions'
import { bindActionCreators } from 'redux';

class Sort extends Component {

    handleClick(e) {
        e.preventDefault();
        this.props.addSorter(e.target.value);
    }

    render() {
        return (
            <div>
                <h1>Price:</h1>
                    <button className='btn btn-primary' value= 'low' onClick={this.handleClick.bind(this)}>
                        Low to High
                    </button>
                    <button className='btn btn-primary' value='high' onClick={this.handleClick.bind(this)}>
                        Hight to Low
                    </button>
            </div>
        )
    }
}




function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSorter }, dispatch);
}

export default connect (null, mapDispatchToProps)(Sort);