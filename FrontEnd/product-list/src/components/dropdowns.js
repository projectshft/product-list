// import _ from "lodash";
import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, changeCategory, changeSort } from "../actions";

class CategoryAndSortDropdowns extends Component {

selectFilterCategory(category) {
    console.log(category);
    this.props.changeCategory(category);
    console.log('clicked category')
    this.props.fetchProducts(category);
}

selectFilterSort(sort) {
    console.log(sort);
    this.props.changeSort(sort);
    console.log('clicked sort')
    this.props.fetchProducts(sort);
}

render() {
    return (
        <div>
            <ButtonGroup>
                <DropdownButton id="dropdown-basic-button" title="Filter by Categories">
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Games'));}} value='Games'>Games</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Health'));}} value='Health'>Health</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Clothing'));}} value='Clothing'>Clothing</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Home'));}} value='Home'>Home</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Electronics'));}} value='Electronics'>Electronics</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Outdoors'));}} value='Outdoors'>Outdoors</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Sort by Price">
                <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterSort("lowest"));}} value='lowest'>Low to High</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterSort('highest'));}} value='highest'>High to Low</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
        </div>
        )
    }
};

function mapStateToProps({ products, categories, sort}) {
    return { products, categories, sort };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { fetchProducts, changeCategory, changeSort },
      dispatch
    );
  }

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAndSortDropdowns);