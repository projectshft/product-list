import React, { Component } from 'react'
import { sortHeader } from './app'

class Sort extends Component {
    constructor (props) {
        super (props)
    }

    render() {
        return (
            
                <div className="dropdown col-md-4">
                    <span className="pr-2">sort by price:</span>
                 
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {sortHeader}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" id="" href="#" onClick={this.props.selectSort}>NONE</a>
                        <a className="dropdown-item" id="Price: Low to High" href="#" onClick={this.props.selectSort}>Price: Low to High</a>
                        <a className="dropdown-item" id="Price: High to Low" href="#" onClick={this.props.selectSort}>Price: High to Low</a>
                    </div>
                </div>
        )
    }
};

export default Sort;