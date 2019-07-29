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
      <DropdownMenu triggerType='text' trigger='Category'>
        <MenuItem text="Movies"
          
          onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: "Movies"
          })
      }} />
        <MenuItem text="Electronics" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: "Electronics"
          })
        }} />
        <MenuItem text="Music" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: "Music"
          })
        }} />
        <MenuItem text="Health" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: "Health"
          })
        }} />
        <MenuItem text="Industrial" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: "Industrial"
          })
        }} />
        <MenuItem text="Clear Category" onClick={e => {
          this.props.searchProducts({
            query: this.props.currentSearch,
            category: ""
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