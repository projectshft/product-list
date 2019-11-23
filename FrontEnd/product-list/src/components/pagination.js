import React, { Component } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/actions";

class PaginateResults extends Component {
    renderPageByPageNum(page){
        console.log('page number clicked')
        console.log(page);
        console.log(this.props.products);
        this.props.fetchProducts(
            this.props.products.sort,
            page,
            this.props.products.category
        );    
    }

    renderPageNumbers(){
        console.log(this.props.products)
        let activePage = this.props.products.page;
        let numberOfPages = this.props.products.numberOfPages;
        let items = [];
        for (let number = 1; number <= numberOfPages; number++) {
            console.log(numberOfPages)
            console.log(activePage)
            items.push(
                <Pagination.Item key={number} 
                onClick= {() => this.renderPageByPageNum(number)}
                active={number === activePage}>
                {number}
                </Pagination.Item>
            );
        }
        return(items)
    }

    render(){
        return (
            <div >
            <Pagination>{this.renderPageNumbers()}</Pagination>
            </div>
        )
    }
}
function mapStateToProps({ products, page }, ownProps) {
    return { products, page };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PaginateResults);