import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions/index';

const DropdownItem = ({ item }) => {

  return (
    <a
      className='dropdown-item'
      onClick={e => {
      }}
      href='#'
    >
      Action
    </a>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(DropdownItem);