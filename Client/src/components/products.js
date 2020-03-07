import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';



class Products extends Component {

    render () {
        return (
            <div>
                <p>Products</p>
                </div>
        )
    }
}


function mapStateToProps({products}) {
  return { products};
}

export default connect(mapStateToProps)(Products);