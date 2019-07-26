import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.renderPaginationItems = this.renderPaginationItems.bind(this);
  }

  componentDidMount() {
    
  }

  renderPaginationItems(pageArray) {
    return (
      pageArray.map(page => {
      return( 
        <li 
          className="page-item"
          key={page}
          onClick={e => {
            console.log('click page-item!');
          }}
        >
          <span className="page-link">
            {page}
          </span>
        </li>
      )
      })
    );
  }

  render() {

    return (
      <div className=''>
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            {this.renderPaginationItems([1,2,3,4,5,6])}
          </ul>
        </nav>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     categories: state.categories,
//     // categories: state.categories
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Pagination);