import React, {Component} from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
    constructor(props) {
        super(props)
    }

    renderCategories() {
        if ( this.props.categoryList !== undefined ) {
                return this.props.categoryList.map(category => {
                    return (
                        <a className="dropdown-item" id={category} href="#" onClick={this.props.selectCategory}>{category}</a>
                    )
                })
    
            } else {
                return (
                    <a className="dropdown-item" href="#">No Categories</a>
                )     
            }       
    }
        
    

    render() {
        return (
            
                <div className="dropdown col-md-4">
                    <span className="pr-2">filter by category:</span>
                 
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categories
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.renderCategories()}
                    </div>
                </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        categoryList: state.products.categoryList
    }
};

export default connect (mapStateToProps) (Categories)