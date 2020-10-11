import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-bootstrap';
import { fetchProducts } from '../actions';

//component used to search/filter/sort our list of products
class SearchFilterSort extends Component {
    constructor() {
        super()

        this.state = {
            category: null,
            search: null,
            sort: null
        }
        this.selectCategory = this.selectCategory.bind(this);
        this.sortPrice = this.sortPrice.bind(this);
        this.getSearch = this.getSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    getProducts() {
        this.props.fetchProducts(this.state)
    }
    
    selectCategory (event) {
        this.setState({category: event.target.dataset.mssg}, () => {
            this.getProducts()
            this.setState({category: null})
        })
        
    }

    sortPrice(event) {
        this.setState({sort: event.target.dataset.mssg}, () => {
            this.getProducts()
            this.setState({sort: null})
        })
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value})
        console.log(this.state.search)
    }
    getSearch(event) {
        event.preventDefault();
        if (event.keyCode === 13){
            if(this.state.search === null) {
                alert('Enter a specific item name')
            }
                this.getProducts();
                this.setState({search: null})
        }
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6 text-center offset-3'>
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <div className="form-inline md-form mr-auto mb-4">
                    <input value={this.state.search || ''} onChange={this.handleSearchChange} onKeyUp={this.getSearch} className="form-control mr-sm-2" type="text" placeholder="Search for a product" aria-label="Search"></input>
                    <Dropdown id='category'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Filter by Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu onClick={this.selectCategory}>
                            <Dropdown.Item data-mssg='Games'>Games</Dropdown.Item>
                            <Dropdown.Item data-mssg='Health'>Health</Dropdown.Item>
                            <Dropdown.Item data-mssg='Tools'>Tools</Dropdown.Item>
                            <Dropdown.Item data-mssg='Clothing'>Clothing</Dropdown.Item>
                            <Dropdown.Item data-mssg='Outdoors'>Outdoors</Dropdown.Item>
                            <Dropdown.Item data-mssg='Music'>Music</Dropdown.Item>
                            <Dropdown.Item data-mssg='Electronics'>Electronics</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown id='sort'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort by Price
                        </Dropdown.Toggle>
                        <Dropdown.Menu onClick={this.sortPrice}>
                            <Dropdown.Item data-mssg='highest'>High-Low</Dropdown.Item>
                            <Dropdown.Item data-mssg='lowest'>Low-High</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
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
