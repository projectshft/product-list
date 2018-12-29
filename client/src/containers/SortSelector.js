import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectSort, goToSelectedPage } from "../actions/index";

//contains the price sort selector
class SortSelector extends Component {

    //on any selection, update the appropriate prop/state and then reset the page count to 1 
    onSortChange = sortType => {
        this.props.selectSort(sortType)
        this.props.goToSelectedPage(1);
    }
  
    render() {
      return (
        <Fragment>
          <label>Sort Option: </label>
          <select onChange = {event => this.onSortChange(event.target.value)}>
              <option value=""></option>
              <option value="highest">Price: Highest to Lowest</option>
              <option value="lowest">Price: Lowest to Highest</option>
          </select>
          </Fragment>
        );
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
         selectSort, goToSelectedPage
      }, dispatch)
  }
  
  export default connect(null, mapDispatchToProps)(SortSelector);
  