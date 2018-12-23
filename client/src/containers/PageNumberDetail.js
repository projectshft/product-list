import React, {Component, Fragment } from "react";
import { connect } from "react-redux";

//build a single product section to render on the page in the grid
class PageNumberDetail extends Component {
    
    render () {
    if (!this.props.page) {
        return <div></div>;
      }
    if(this.props.page === this.props.activePage) {
        return (
            <Fragment>
            <p className = "active-page single-page-num"><em>{this.props.page}</em></p>
          </Fragment>
        )
    } else {
      return (
        <Fragment>
          <p className = "single-page-num"><em>{this.props.page}</em></p>
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
  
  export default connect(mapStateToProps)(PageNumberDetail);