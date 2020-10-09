import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-bootstrap';
import { fetchProducts } from '../actions';

//component used to search/filter/sort our list of products
class SearchFilterSort extends Component {

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6 text-center offset-3'>
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <form class="form-inline md-form mr-auto mb-4">
                    <input id='search' class="form-control mr-sm-2" type="text" placeholder="Search for a product" aria-label="Search"></input>
                    <Dropdown id='category'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Filter By Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
         {/* TODO, add onclick to take the values of the text box and filter by that category*/}
                            <Dropdown.Item value = {"Games"}>Games</Dropdown.Item>
                            <Dropdown.Item value = {"Health"}>Health</Dropdown.Item>
                            <Dropdown.Item value = {"Tools"}>Tools</Dropdown.Item>
                            <Dropdown.Item value = {"Clothing"}>Clothing</Dropdown.Item>
                            <Dropdown.Item value = {"Outdoors"}>Outdoors</Dropdown.Item>
                            <Dropdown.Item value = {"Music"}>Music</Dropdown.Item>
                            <Dropdown.Item value = {"Electronics"}>Electronics</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown id='sort'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort by Price
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item value = {"highest"}>High-Low</Dropdown.Item>
                            <Dropdown.Item value = {"lowest"}>Low-High</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterSort);
