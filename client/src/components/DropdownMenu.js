import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';
import DropdownItem from './DropdownItem';

class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
  }

  componentDidMount() {
    this.props.searchProducts({});
  }

  renderDropdownItems(categoriesArray) {
    return (
      categoriesArray.map(category => {
        return <DropdownItem category={category} />;
      })
    );
  }

  render() {
    
    return (
      <div className='dropdown-menu-wrap float-right'>
        <label className='mr-1'>{this.props.name==='Category' ? 'Filter': 'Sort'} by: </label>
        <div className="btn-group">
          
          <div className="dropdown mr-4">
            <button className="btn btn-info dropdown-toggle" type="button">
              {this.props.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

            </div>
          </div>
        </div>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(DropdownMenu);