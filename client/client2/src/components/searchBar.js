import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchProducts } from '../actions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      dropdownOpen: false,
      category: "All",
      sortByPrice:1,
      page:1
    };
  }
  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  }
  handleFormtyping = (searchTerm) => {
    this.setState({ searchTerm });
  }

  render() {
    return <div>
        <nav className="navbar navbar-light bg-light">
          <div className="form-inline">
            <input className="form-control mr-sm-2" value={this.state.searchTerm} onChange={event => this.handleFormtyping(event.target.value)} placeholder="Search for products" />
            <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropdown()}>
            <DropdownToggle caret>{`${this.state.category}`}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.setState({category:"Computers"})}>Computers</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Electronics"})}>Electronics</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Games"})}>Games</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Sports"})}>Sports</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Garden"})}>Garden</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Grocery"})} >Grocery</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Music"})}>Music</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Jewelry"})}>Jewelry</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Tools"})}>Tools</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Health"})}>Health</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Beauty"})}>Beauty</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Shoes"})}>Shoes</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Clothing"})}>Clothing</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Toys"})}>Toys</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Kids"})}>Kids</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Home"})}>Home</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Books"})}>Books</DropdownItem>
              <DropdownItem onClick={() => this.setState({category:"Movies"})}>Movies</DropdownItem>
                <DropdownItem onClick={() => this.setState({category:"Outdoors"})}>Outdoors</DropdownItem>
              <DropdownItem onClick={() => this.setState({category:"Automotive"})}>Automotive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.props.fetchProducts(this.state)}>
              Search
            </button>
          </div>
        </nav>
      </div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProducts }, dispatch);
}



export default connect(null, mapDispatchToProps)(SearchBar)
