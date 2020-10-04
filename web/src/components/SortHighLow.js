import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SortHighLow =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
    
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Sort 
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>None</DropdownItem>
                <DropdownItem>Price: Low to High</DropdownItem>
                <DropdownItem>Price: High to Low</DropdownItem>
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
  
  // function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
  //}
  
  
  export default connect(mapStateToProps)(SortHighLow);