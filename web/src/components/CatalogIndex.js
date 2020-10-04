import React from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CatalogIndex =(props) => {
    
// get state of categories from action
    return (
      <div className='text-center'>
      <Pagination aria-label="Page navigation example">
      <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
      </div>
);

    };



function mapStateToProps(state) {
    return {
   //   destinations: state.destinations,
     // selectedRadius: state.selectedRadius,
    };
  }
  
  // function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
  // }
  
  
  export default connect(mapStateToProps)(CatalogIndex);