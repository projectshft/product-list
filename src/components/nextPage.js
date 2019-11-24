import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Pagination } from 'react-bootstrap';
import { fetchProducts } from "../actions";


//This component will give the user the option to see other pages of products 
class NextPage extends Component {
    componentDidMount() {
        this.props.fetchProducts();

    }


    fetchNewPage(page) {

        let category = this.props.category;
        let sort = this.props.sort;

        console.log('category', category)

        this.props.fetchProducts(category, sort, page);
    }

    renderLinks() {
        let pageLinks = [];

        for (var i = 1; i < this.props.pages + 1; i++) {
            pageLinks.push(
                <li onClick={this.fetchNewPage.bind(this, i)} className="page-item"><a className="page-link" href="#">{i}</a></li>
            )
        }
        return pageLinks;
    }

    render() {
        return (
            <div className="nextPage">
                <nav aria-label="...">
                    <ul className="pagination pagination-sm">
                        {this.renderLinks()}
                    </ul >
                </nav>
            </div>
        )
    }

}

function mapStateToProps(state) {
    console.log(state)
    return { pages: state.pagination, category: state.category, products: state.products };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NextPage);

