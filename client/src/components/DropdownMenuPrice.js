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
            category: this.props.currentCategory,
            price: 'lowest'
          })
      }} />
       
        <MenuItem text="Highest to Lowest" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: this.props.currentCategory,
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
    currentCategory: state.products.currentCategory
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsMenu);