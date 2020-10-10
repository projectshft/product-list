import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchProducts, setCategory } from "../actions";
const CategorySelector =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
      const userSearchCategory = (changeEvent) => {
          console.log('Category changed to: ', changeEvent.currentTarget.textContent);
          props.fetchProducts(props.currentPage, changeEvent.currentTarget.textContent, props.searchTerm, props.sortOrder);
          props.setCategory(changeEvent.currentTarget.textContent)
        };

   /*      const getCategoryDropdowns =() => {
          let categoryDropdowns =[];
          for (let p = 0; p <= pageCount; p++){
          pagesLinks.push(
          <PaginationItem>
            <PaginationLink href='#'>{p+1}</PaginationLink>
          </PaginationItem>)
          }
          return pagesLinks
        } */
        
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret >
                Categories 
            </DropdownToggle >
            <DropdownMenu >
              {/* {getCategoryDropdowns} */}
                <DropdownItem><div onClick={userSearchCategory}>Home</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Electronics</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Beauty</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Shoes</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Tools</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Industrial</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Books</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Jewelery</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Automotive</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Health</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Toys</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Kids</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Movies</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Sports</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Grocery</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Outdoors</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Clothing</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Garden</div></DropdownItem>
                <DropdownItem><div onClick={userSearchCategory}>Games</div></DropdownItem>

            </DropdownMenu>
            </Dropdown></div>

);

    };



    function mapStateToProps(state) {
      return {
        currentPage: state.currentPage,
        sortOrder: state.sortOrder,
        searchTerm: state.searchTerm

      };
    }
    
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
        {
          fetchProducts,
          setCategory
        },
        dispatch
      );
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);