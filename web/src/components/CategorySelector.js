import React, { cloneElement } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchProducts, setCategory, getCategories } from "../actions";
const CategorySelector =(props) => {
  
    // if (!props.categories.categories) {
      // props.getCategories();
      console.log(' -> got category props @ component', props.categories)
    // };
    
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
      const userSearchCategory = (changeEvent) => {
          console.log('Category changed to: ', changeEvent.currentTarget.textContent);
          props.fetchProducts(props.currentPage, changeEvent.currentTarget.textContent, props.searchTerm, props.sortOrder);
          props.setCategory(changeEvent.currentTarget.textContent)
        };

       const getCategoryDropdowns =() => {
          let categoryCount = props.categories.length;
          console.log('categories', props.categories.length )
          console.log('in categorySeletor categories', props.categories )
          console.log('type of', typeof(props.categories))
          let categoryDropdowns =[];
          //could also map with an index
          for (let p = 0; p < categoryCount; p++){
            let dropdownLinkItem = '<DropdownItem key=' + p + '><div onClick={userSearchCategory}>' + props.categories[p] + '</div></DropdownItem>';
            categoryDropdowns.push(dropdownLinkItem);
            console.log(`<DropdownItem key=${p}><div onClick={userSearchCategory}>${props.categories[p]}</div></DropdownItem>`)
          }
          return categoryDropdowns;
        } 
        const makeAnArray = () => {
          let categoryCount = props.categories.length;
          let returnMe = [];
          for (let p = 0; p < categoryCount; p++) {
            returnMe.push(props.categories[p]);
          }
          return returnMe;
        }
        let niceArray = makeAnArray();
// get state of categories from action
    return (
        <div className='text-center'><Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret >
                Categories 
            </DropdownToggle >
            <DropdownMenu >
              {/* {getCategoryDropdowns()} */}
              {niceArray.map((catItem, i) => <div><DropdownItem key={i}><div onClick={userSearchCategory}>{catItem}</div></DropdownItem></div> )}
            </DropdownMenu>
            </Dropdown></div>

);

    };



    function mapStateToProps(state) {
      return {
        currentPage: state.currentPage,
        sortOrder: state.sortOrder,
        searchTerm: state.searchTerm,
        categories: state.categories

      };
    }
    
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(
        {
          fetchProducts,
          setCategory,
          getCategories
        },
        dispatch
      );
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);


   /*  <DropdownItem><div onClick={userSearchCategory}>Home</div></DropdownItem>
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
                <DropdownItem><div onClick={userSearchCategory}>Games</div></DropdownItem> */