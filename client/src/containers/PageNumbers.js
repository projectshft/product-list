import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { goToSelectedPage } from "../actions/index";
import PageNumberDetail from "./PageNumberDetail";

//build the page numbers list at the bottom of the page
class PageNumbers extends Component {

    //build a link for each page number and make the selected page active
    renderPageNumbers = () => {
        console.log(this.props.numPages);
        let pageNumArr = [];
        for (let i = 1; i <= this.props.numPages; i++) {
            pageNumArr.push(i);
        }
        return pageNumArr.map((p,index) => <PageNumberDetail page={p} key={index} />)
    }

    render () {
        return <div className="row page-num">
            {this.renderPageNumbers()}
        </div>
    };
};

function mapStateToProps(state) {
    return {
      activePage: state.activePage,
      numPages: state.numPages
    };
  };

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goToSelectedPage
      }, dispatch)
  };

  export default connect(mapStateToProps, mapDispatchToProps)(PageNumbers);