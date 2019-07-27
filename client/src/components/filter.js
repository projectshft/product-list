import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategory } from '../actions';


class Filter extends Component {
    
    handleClick(e) {
        e.preventDefault();
        this.props.addCategory(e.target.value);
    }

    render() {
        return (
            <div>
                <h1>Categories: </h1>
                <button className='btn btn-primary' value= 'Home' onClick={this.handleClick.bind(this)}>
                    Home
                </button>
                <button className='btn btn-primary' value= 'Industrial' onClick={this.handleClick.bind(this)}>
                    Industrial
                </button>            
                <button className='btn btn-primary' value= 'Games' onClick={this.handleClick.bind(this)}>
                    Games
                </button>
                <button className='btn btn-primary' value= 'Toys' onClick={this.handleClick.bind(this)}>
                    Toys
                </button>
            </div>
       
        )
    }
}




function mapDispatchToProps(dispatch) {
    return bindActionCreators ({addCategory}, dispatch)
}


export default connect (null, mapDispatchToProps)(Filter);