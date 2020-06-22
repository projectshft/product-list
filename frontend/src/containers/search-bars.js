import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ProductDisplay from '../containers/product-display';


class SearchBars extends Component {
    constructor() {
        super()

        this.state = {
            query: null,
            category: null,
            price: null,
            page: null
        }
    }

    componentDidMount() {
        this.props.fetchProducts()
 
    }

    search(event) {
        if (event.keyCode === 13) {
            this.setState({query: event.target.value}, () => {
                this.requestProducts()
            })
        }
    }

    requestProducts() {
        this.props.fetchProducts(this.state.category, this.state.price, this.state.query, this.state.page)
    }

    selectCategory(event) {
        if (event.target.value === 'Sort by Category') {
            this.setState({category: null}, () => {
                this.requestProducts()
            })
        } else {
            this.setState({category: event.target.value}, () => {
                this.requestProducts()
            })
        }
    }

    selectPrice(event) {
        if (event.target.value === 'Sort by Price') {
            this.setState({price: null}, () => {
                this.requestProducts()
            })
        } else {
            this.setState({price: event.target.value}, () => {
                this.requestProducts()
            })
        }
    }

    renderPageNumbers() {
        
        const listLength = this.props.products[0]
        console.log(listLength)
        const numOfPages = Math.ceil(listLength / 9)
        const pageArray = []
        for (let i = 0 ; i < numOfPages ; i++) {
            pageArray.push(i + 1)
        }
        return pageArray.map(page => {
            return (
                <li key={page} onClick={this.selectPage.bind(this)} value={page}>{page}</li> 
            )
        })
    }

    selectPage(event) {
        this.setState({page: event.target.value}, () => {
            this.requestProducts()
            this.setState({page: null}, () => {
                console.log('page back to null')
            })
        })
    }


    render() {
        
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Col xs={7}>
                        <Form.Control placeholder="Search" id="search"  onKeyUp={this.search.bind(this)}/>
                        </Col>
                        <Col>
                        <Form.Control as="select" onChange={this.selectCategory.bind(this)}>
                            <option>Sort by Category</option>
                            <option>Baby</option>
                            <option>Tools</option>
                            <option>Outdoors</option>
                        </Form.Control>    
                        </Col>
                        <Col>
                        <Form.Control as="select" onChange={this.selectPrice.bind(this)}>
                            <option>Sort by Price</option>
                            <option>highest</option>
                            <option>lowest</option>
                        </Form.Control> 
                        </Col>
                    </Form.Row>
                </Form>
                <ProductDisplay />
                <ul>
                    {this.renderPageNumbers()}
                </ul>
            </div>    
        );
    }
}

function mapStateToProps({ products }) {
    return { products };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(SearchBars);