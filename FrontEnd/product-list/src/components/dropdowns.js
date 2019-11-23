import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, changeCategory, changeSort } from "../actions/actions";

class CategoryAndSortDropdowns extends Component {

selectFilterCategory(category) {
    console.log('clicked category')
    console.log(category);
    console.log(this.props.products);
    this.props.changeCategory(category);
    console.log(this.props.products.category);
    let selectedCategory = this.props.products.category;
    let statePage = this.props.products.page;
    let stateSort = this.props.products.sort;
    this.props.fetchProducts(stateSort, statePage, selectedCategory);
}

selectFilterSort(sort) {
    console.log('clicked sort');
    console.log(sort);
    this.props.changeSort(sort);
    console.log(this.props.products.sort);
    let selectedSort = this.props.products.sort;
    let stateCategory = this.props.products.category;
    let statePage = this.props.products.page;
    this.props.fetchProducts(selectedSort, statePage, stateCategory);
}

render() {
    return (
        <div>
            <ButtonGroup>
                <DropdownButton id="dropdown-basic-button" title="Filter by Categories">
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory(''));}} value='all'>All Products</Dropdown.Item>
                    <Dropdown.Divider />
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
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Industrial'));}} value='Industrial'>Industrial</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Garden'));}} value='Garden'>Garden</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Sports'));}} value='Sports'>Sports</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Toys'));}} value='Toys'>Toys</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterCategory('Jewelery'));}} value='Jewelery'>Jewelery</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Sort by Price">
                    <Dropdown.Item
                    onClick= {e=> {e.preventDefault(this.selectFilterSort(""));}} value='None'>Unsorted</Dropdown.Item>
                    <Dropdown.Divider />
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

function mapStateToProps({ products, category, sort}, ownProps) {
    return { products, category, sort };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { fetchProducts, changeCategory, changeSort },
      dispatch
    );
  }

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAndSortDropdowns);