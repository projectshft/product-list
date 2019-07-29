import React from 'react';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';

class SettingsMenu extends React.Component {
  constructor() {
    super();
    
  }

  render() {
    return (
      <DropdownMenu triggerType='text' trigger='Sort by Price'>
        <MenuItem text="Lowest to Highest"
          
          onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            price: 'lowest'
          })
      }} />
       
        <MenuItem text="Highest to Lowest" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            price: 'lowest'
          })
        }} />
      </DropdownMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    
    currentSearch: state.products.currentSearch,
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);