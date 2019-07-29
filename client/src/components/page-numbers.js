import React, { Component } from 'react';
import { connect } from 'react-redux';

class PageNumbers extends Component {
    constructor (props) {
        super(props)
    }

    //function creates page numbers at the bottom of the page based on the pageArray provided by the store from the get request
    renderPages () {
        if ( this.props.pageArray !== undefined ) {
            return this.props.pageArray.map(page => {
                return (
                    <a href="#" id={page} className="m-2 mb-5" onClick={this.props.selectPageNumber}>{page}</a>
                )
            })
        }
    }

    render() {
        
        return (
            <div className="text-center col-md-12">
                {this.renderPages()}
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        pageArray: state.products.pageArray
    }
}

export default connect (mapStateToProps) (PageNumbers);