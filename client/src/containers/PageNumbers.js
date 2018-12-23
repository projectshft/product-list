import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//build the page numbers list at the bottom of the page
class PageNumbers extends Component {

    //build a link for each page number and make the selected page active
    renderPageNumbers = () => {
        let pageNumString = "";
        for (i = 1; i <= this.props.numPages; i++) {
            if (i == this.props.activePage) {
                pageNumString += '<a className ="active" onClick={this.props.goToSelectedPage(i)} key={i}>{i}</a>'
            } else {
                pageNumString += '<a onClick={this.props.goToSelectedPage(i)} key={i}>{i}</a>'
            }
        }
    }

    render () {
        return <Fragment>
            {this.renderPageNumbers}
        </Fragment>
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