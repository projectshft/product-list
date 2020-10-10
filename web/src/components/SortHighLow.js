import React from 'react';
import { useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchProducts, setSortOrder } from "../actions";

const SortHighLow =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
      const userSortOrder = (changeEvent) => {
        console.log('Sort order changed to: ', changeEvent.currentTarget.textContent);
        let sortPriority = '';
        if (changeEvent.currentTarget.textContent === 'Price: Low to High') {
            sortPriority = 'Lowest';
         } else if (changeEvent.currentTarget.textContent === 'Price: High to Low') {
             sortPriority = 'Highest';
         }else {
             sortPriority = 'None';
         }

        props.fetchProducts(props.currentPage, null, null, sortPriority);
      };
    
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Sort 
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>None</DropdownItem>
                <DropdownItem><div onClick={userSortOrder}>Price: Low to High</div></DropdownItem>
                <DropdownItem><div onClick={userSortOrder}>Price: High to Low</div></DropdownItem>
            </DropdownMenu>
            </Dropdown></div>

);

    };



function mapStateToProps(state) {
    return {
        currentPage: state.currentPage

    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
          fetchProducts,
          setSortOrder
        },
        dispatch
        );
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SortHighLow);