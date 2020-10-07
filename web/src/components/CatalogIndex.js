import React from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import ReactDOM from 'react-dom'

// TODO, I think. Make this page a Component and create a function to call
// within the jsx return() to render the enumerated page links
const CatalogIndex =(props) => {
   let pageCount = Math.ceil(props.products.count / 9)
   let pageButtons = ''
  
  const printPageLinks =() => {
    let pagesLinks =[];
    for (let p = 0; p <= pageCount; p++){
    pagesLinks.push(
    <PaginationItem>
      <PaginationLink href='#'>{p+1}</PaginationLink>
    </PaginationItem>)
    }
    return pagesLinks
  }

    return ( 
      <div className='text-center'>
        <p>Total products available in this search: {props.products.count} </p>
      <Pagination aria-label="Page navigation example">
      <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {/* <span id="buttons"></span> */}
        {/* {pageButtons} */}
        {/* future function to render these goes here */}
        {printPageLinks()}
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
    return { products: state.products }
  };
  
  export default connect(mapStateToProps)(CatalogIndex);