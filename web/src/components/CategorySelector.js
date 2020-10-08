import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchProducts } from "../actions";
const CategorySelector =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
      const userSearchCategory = (changeEvent) => {
          console.log('Category changed to: ', changeEvent.currentTarget.textContent);
            // props.fetchProducts(null, null, changeEvent.target.value);
        };
        
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret >
                Categories 
            </DropdownToggle >
            <DropdownMenu >
                <DropdownItem ><div value="Home" onClick={userSearchCategory}>Home</div></DropdownItem>
                <DropdownItem>Electronics</DropdownItem>
                <DropdownItem>Beauty</DropdownItem>
                <DropdownItem>Shoes</DropdownItem>
                <DropdownItem>Tools</DropdownItem>
                <DropdownItem>Industrial</DropdownItem>
                <DropdownItem>Books</DropdownItem>
                <DropdownItem>Jewelery</DropdownItem>
                <DropdownItem>Automotive</DropdownItem>
                <DropdownItem>Health</DropdownItem>
                <DropdownItem>Toys</DropdownItem>
                <DropdownItem>Kids</DropdownItem>
                <DropdownItem>Movies</DropdownItem>
                <DropdownItem>Sports</DropdownItem>
                <DropdownItem>Grocery</DropdownItem>
                <DropdownItem>Outdoors</DropdownItem>
                <DropdownItem>Clothing</DropdownItem>
                <DropdownItem>Garden</DropdownItem>
                <DropdownItem>Games</DropdownItem>

            </DropdownMenu>
            </Dropdown></div>

);

    };



    function mapStateToProps(state) {
      return {
        products: state.products,
      };
    }
    
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
        {
          fetchProducts,
        },
        dispatch
      );
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);