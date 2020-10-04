import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CategorySelector =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
    
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Categories 
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Home</DropdownItem>
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
   //   destinations: state.destinations,
     // selectedRadius: state.selectedRadius,
    };
  }
  
//   function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
//   }
  
  
  export default connect(mapStateToProps)(CategorySelector);