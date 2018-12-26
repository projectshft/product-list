import React, {Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { goToSelectedPage } from '../actions/index';

//build a single product section to render on the page in the grid
class PageNumberDetail extends Component {

    render () {
    if (!this.props.page) {
        return <div></div>;
      }
    if(this.props.page === this.props.activePage) {
        return (
            <Fragment>
            <p onClick= {() => this.props.goToSelectedPage(this.props.page)} className = "active-page single-page-num"><em>{this.props.page}</em></p>
          </Fragment>
        )
    } else {
      return (
        <Fragment>
            <p onClick={() => this.props.goToSelectedPage(this.props.page)} className = "single-page-num"><em>{this.props.page}</em></p>
        </Fragment>
      );
    }
  }
  }

  function mapStateToProps(state) {
      return {
          activePage : state.activePage
      }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goToSelectedPage
      }, dispatch)
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PageNumberDetail);