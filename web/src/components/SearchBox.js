import React from 'react';
// import { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

const SearchBox =(props) => {    
    
// get state of categories from action
    return (
        <div className='text-center'><InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Search The Catalog" />
      </InputGroup></div>

);

    };



function mapStateToProps(state) {
    return {
   //   destinations: state.destinations,
     // selectedRadius: state.selectedRadius,
    };
  }
  
//   function mapDispatchToProps(dispatch) {
//   //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
//   }
  
  
  export default connect(mapStateToProps)(SearchBox);