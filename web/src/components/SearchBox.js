import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';

const SearchBox =(props) => {
    
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);
    
    
// get state of categories from action
    return (
        <div class="text-center"><InputGroup>
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
  
  function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);