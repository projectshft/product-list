import React, { Component } from "react";
import { connect } from "react-redux";
import PageNumberDetail from "./PageNumberDetail";

//build the page numbers list at the bottom of the page
class PageNumbers extends Component {

    //build a link for each page number and make the selected page active
    renderPageNumbers = () => {
        let pageNumArr = [];
        for (let i = 1; i <= this.props.numPages; i++) {
            pageNumArr.push(i);
        }
        return pageNumArr.map((p,index) => <PageNumberDetail page={p} key={index} />)
    }

    render () {
        if (this.props.numPages === 0) {
            return <div></div>
        } else {
            return <div className="row page-num">
            <p className="page-select">Select Page: </p>
            {this.renderPageNumbers()}
            </div>
        }
    };
};

function mapStateToProps(state) {
    return {
      activePage: state.activePage,
      numPages: state.numPages
    };
  };


  export default connect(mapStateToProps)(PageNumbers);