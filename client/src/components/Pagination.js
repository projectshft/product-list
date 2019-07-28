import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.renderPaginationItems = this.renderPaginationItems.bind(this);
    this.checkCurrentPage = this.checkCurrentPage.bind(this);
  }

  componentDidMount() {
    
  }
  checkCurrentPage(page){ return page === this.props.currentPage ? 'disabled' : ''};

  renderPaginationItems(pageArray) {
    return (
      pageArray.map(page => {
      return( 
        <li 
          className="page-item"
          key={page}
          onClick={e => {
            this.props.searchProducts({
              query: this.props.currentSearch,
              page
            })
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
    if(this.props.pages === undefined){
      return (<div className=''></div>)
    }

    return (
      <div className=''>
        <nav aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            {this.renderPaginationItems(this.props.pages)}
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pages: state.products.pages,
    currentSearch: state.products.currentSearch,
    currentPage: state.products.currentPage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);