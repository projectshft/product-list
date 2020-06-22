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
            event.preventDefault()
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
        
        const listLength = this.props.products.count
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

    renderCategoryOptions() {
        // let categoriesArray = []
        // if (this.props.products.categories) {
        //     const shortCategoryList = this.props.products.categories.reduce(category => {
        //         if (categoriesArray.includes(category)) {
        //             return false
        //         } else {
        //             categoriesArray.push(category)
        //             return true
        //         } 
        //     }, [])
        //     console.log(shortCategoryList)
        // }

        if (this.props.products.categories) {
            let categoriesArray = []
            this.props.products.categories.forEach(category => {
                categoriesArray.push(category.category)
            }) 
            // filter down to only unique values of categories
            const categoriesArrayUnique = categoriesArray.filter((value, index, array) => array.indexOf(value) === index); 
            return categoriesArrayUnique.map(category => {
                return (
                    <option key={category}>{category}</option>
                )
            })
            
        }
    }


    render() {
        
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Col xs={7}>
                        <Form.Control placeholder="Search" id="search"  onKeyDown={this.search.bind(this)}/>
                        </Col>
                        <Col>
                        <Form.Control as="select" onChange={this.selectCategory.bind(this)}>
                            <option>Sort by Category</option>
                            {/* <option>Baby</option>
                            <option>Tools</option>
                            <option>Outdoors</option> */}
                            {this.renderCategoryOptions()}
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