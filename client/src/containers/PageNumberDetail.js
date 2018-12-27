import React, {Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { goToSelectedPage } from '../actions/index';

//build a single product section to render on the page in the grid
class PageNumberDetail extends Component {

    //if there's no page, then don't show the numbers at all
    render () {
        if (!this.props.page) {
            return <Fragment />;
        }
        //give the active page a special class to differentiate
        if(this.props.page === this.props.activePage) {
            return (
                <Fragment>
                <p onClick= {() => this.props.goToSelectedPage(this.props.page)} className = "active-page single-page-num"><em>{this.props.page}</em></p>
            </Fragment>
            )
        // build a normal page number
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
        }, 
    dispatch)
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PageNumberDetail);