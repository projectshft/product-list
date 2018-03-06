import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/fetch-products';
import { fetchAllProducts } from '../actions/fetch-all-products';

// class ProductList extends Component {
//     constructor(props) {
//         super(props);

//         this.props.fetchProducts(null, null, null, 1);
//         this.props.fetchAllProducts();

//         const { allProducts } = this.props.allProducts;
//         const numberOfPages = allProducts / 9;

//         this.state = {
//             page: 1,
//             pages: []
//         }
//         debugger;
//         for (let i = 1; i < numberOfPages; i++) {
//             this.state.pages.push(i);
//         }
//     }

//     renderProducts() {
//         return this.props.products.products.map( product => {
//             return (
//                 <Link to={`/${product._id}`} className="col text-center products" key={product._id}>
//                     <img className="product-image" src={product.image} alt="" />
//                     <h3 className="link">{product.name}</h3>
//                     <h5 className="link">{product.category}</h5>
//                     <h6 className="link">${product.price}</h6>
//                 </Link>
//             )
//         })
//     }

    // renderPagination() {
    //     return this.state.pages.map( number => {
    //         return (
    //             <div className="row justify-content-center">
    //                 <button onClick={this.onPageButtonClick} value={number} className={this.state.page == number ? "btn-link isPressed" : "btn-link"}>{number}</button>
    //             </div>
    //         )
    //     })
    // }

//     onPageButtonClick = (event) => {
//         if (this.state.page == event.target.value) {
//             return;
//         }

//         this.setState({ page: event.target.value });
//         this.props.fetchProducts(null, null, null, event.target.value);
//         this.renderProducts();
//     }

//     render() {
//         if (!this.props.products.products) {
//             return <div>Loading...</div>
//         }

//         return (
//             <div>
//                 <div className="row">
//                     {this.renderProducts()}
//                 </div>
//                 <div>
//                     {this.renderPagination()}
//                     {/* <button onClick={this.onPageButtonClick} value="1" className={this.state.page == 1 ? "btn-link isPressed" : "btn-link"}>1</button>
//                     <button onClick={this.onPageButtonClick} value="2" className={this.state.page == 2 ? "btn-link isPressed" : "btn-link"}>2</button>
//                     <button onClick={this.onPageButtonClick} value="3" className={this.state.page == 3 ? "btn-link isPressed" : "btn-link"}>3</button>
//                     <button onClick={this.onPageButtonClick} value="4" className={this.state.page == 4 ? "btn-link isPressed" : "btn-link"}>4</button>
//                     <button onClick={this.onPageButtonClick} value="5" className={this.state.page == 5 ? "btn-link isPressed" : "btn-link"}>5</button>
//                     <button onClick={this.onPageButtonClick} value="6" className={this.state.page == 6 ? "btn-link isPressed" : "btn-link"}>6</button>
//                     <button onClick={this.onPageButtonClick} value="7" className={this.state.page == 7 ? "btn-link isPressed" : "btn-link"}>7</button>
//                     <button onClick={this.onPageButtonClick} value="8" className={this.state.page == 8 ? "btn-link isPressed" : "btn-link"}>8</button>
//                     <button onClick={this.onPageButtonClick} value="9" className={this.state.page == 9 ? "btn-link isPressed" : "btn-link"}>9</button>
//                     <button onClick={this.onPageButtonClick} value="10" className={this.state.page == 10 ? "btn-link isPressed" : "btn-link"}>10</button> */}
//                 </div>
//             </div>
//         )
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({fetchProducts, fetchAllProducts}, dispatch)
// }

// const mapStateToProps = (state) => {
//     return {
//         products: state.products,
//         allProducts: state.allProducts
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.props.fetchProducts(null, null, null, 1);
        this.props.fetchAllProducts();

        this.state = {
            page: 1
        }
    }

    renderProducts() {
        console.log('products good.')
        return this.props.products.products.map( product => {
            return (
                <Link to={`/${product._id}`} className="col text-center products" key={product._id}>
                    <img className="product-image" src={product.image} alt="" />
                    <h3 className="link">{product.name}</h3>
                    <h5 className="link">{product.category}</h5>
                    <h6 className="link">${product.price}</h6>
                </Link>
            )
        })
    }

    OnPageButtonClick(event) {
        console.log('button good.')
        if (this.state.page == event.target.value) {
            return;
        }

        this.setState({ page: event.target.value });
        this.props.fetchProducts(null, null, null, event.target.value);
        this.renderProducts();
    }

    renderPagination = () => {
        let pages = [];

        const { allProducts } = this.props.allProducts;
        const numberOfPages = allProducts.length / 9;
        console.log(allProducts)
        console.log(numberOfPages)

        for (let i = 1; i < numberOfPages; i++) {
            pages.push(i);
        }

        return pages.map( (number) => {
            console.log(this)
            console.log(number);
            return (
                <button onClick={() => this.onPageButtonClick()} value={number} className={this.state.page == number ? "btn-link isPressed" : "btn-link"}>{number}</button>
            )
        })
    }

    renderOther() {
        console.log('good.');
    }

    render() {
        if (!this.props.products.products) {
            return <div>Loading...</div>
        }

        return (
            <div>
                {this.renderOther()}
                <div className="row">
                    {this.renderProducts()}
                </div>
                <div>
                    <div className="row justify-content-center">
                        {this.renderPagination()}
                        {/* <button onClick={this.onPageButtonClick} value="1" className={this.state.page == 1 ? "btn-link isPressed" : "btn-link"}>1</button>
                        <button onClick={this.onPageButtonClick} value="2" className={this.state.page == 2 ? "btn-link isPressed" : "btn-link"}>2</button>
                        <button onClick={this.onPageButtonClick} value="3" className={this.state.page == 3 ? "btn-link isPressed" : "btn-link"}>3</button>
                        <button onClick={this.onPageButtonClick} value="4" className={this.state.page == 4 ? "btn-link isPressed" : "btn-link"}>4</button>
                        <button onClick={this.onPageButtonClick} value="5" className={this.state.page == 5 ? "btn-link isPressed" : "btn-link"}>5</button>
                        <button onClick={this.onPageButtonClick} value="6" className={this.state.page == 6 ? "btn-link isPressed" : "btn-link"}>6</button>
                        <button onClick={this.onPageButtonClick} value="7" className={this.state.page == 7 ? "btn-link isPressed" : "btn-link"}>7</button>
                        <button onClick={this.onPageButtonClick} value="8" className={this.state.page == 8 ? "btn-link isPressed" : "btn-link"}>8</button>
                        <button onClick={this.onPageButtonClick} value="9" className={this.state.page == 9 ? "btn-link isPressed" : "btn-link"}>9</button>
                        <button onClick={this.onPageButtonClick} value="10" className={this.state.page == 10 ? "btn-link isPressed" : "btn-link"}>10</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({fetchProducts, fetchAllProducts}, dispatch)
    }
    
    const mapStateToProps = (state) => {
        return {
            products: state.products,
            allProducts: state.allProducts
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);