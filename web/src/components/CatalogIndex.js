import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { bindActionCreators } from "redux";
import { setCurrentPage, fetchProducts } from "../actions";

const CatalogIndex = (props) => {

// class CatalogIndex extends React.Component {
  // constructor(props) {
    //  super(props);
    //  this.state = {
    //    products: this.state.products,
    //    pageCount: Math.ceil(props.products.count / 9),
    //    currentPage: this.state.currentPage
    // }
  // this.userFirstPage = this.userFirstPage.bind(this)}
  // let pageCount = Math.ceil(props.products.count / 9)
  // console.log('total page count: ', pageCount)
  
  let pageCount = Math.ceil(props.products.count / 9);

  const printPageLinks =() => {
    let pagesLinks =[];
    for (let p = 0; p < pageCount; p++){
    pagesLinks.push(
    <PaginationItem  key={p}>
      <PaginationLink href='#'><span onClick={userSetPage}>{p+1}</span></PaginationLink>
    </PaginationItem>)
    }
    return pagesLinks
  }

  const userSetPage = (changeEvent) => {
    console.log('Page changed to: ', changeEvent.currentTarget.textContent);
    props.fetchProducts(changeEvent.currentTarget.value);
    props.setCurrentPage(changeEvent.currentTarget.value);
  }
  
  const userFirstPage = () => {
    console.log('Page changed to: ', 1);
    props.fetchProducts(1);
    props.setCurrentPage(1);
  }
  
  const userLastPage = () => {
    props.fetchProducts(pageCount);
    console.log('Page changed to: ', pageCount);
    props.setCurrentPage(pageCount);
  }
  
  const userNextPage = () => {
    props.fetchProducts(props.currentPage + 1 >= pageCount ? pageCount : props.currentPage + 1);
    console.log('Page changed to: ', props.currentPage + 1 >= pageCount ? pageCount : props.currentPage + 1);
    props.setCurrentPage(props.currentPage + 1 >= pageCount ? pageCount : props.currentPage + 1);
  }

  const userPrevPage = () => {
    props.fetchProducts(props.currentPage -1 <= 1 ? 1 : props.currentPage - 1);
    console.log('Page changed to: ' , props.currentPage - 1 <= 1 ? 1 : props.currentPage - 1);
    props.setCurrentPage(props.currentPage - 1 <= 1 ? 1 : props.currentPage - 1);
  }

  // render() {
    return ( 
      <div><Row><Col>
        <p className='text-center'>Total products available in this search: {props.products.count} </p>
        </Col>
        </Row>
        <Row>
        <Col xs="1" sm="3"/>
        <Col xs="6" sm="6">
      <Pagination aria-label="Page navigation">
      <PaginationItem>
          <PaginationLink first href="#" onClick={userFirstPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" onClick={userPrevPage} />
        </PaginationItem>
        {printPageLinks()}
         <PaginationItem>
          <PaginationLink next href="#" onClick={userNextPage}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" onClick={userLastPage}/>
        </PaginationItem>
      </Pagination>
      </Col>
      <Col sm="3" />
      </Row>
      </div>
    );
    }
  

function mapStateToProps(state) { 
        return {
        products: state.products,
        currentPage: state.currentPage

      };
    }
function mapDispatchToProps(dispatch) {
      return bindActionCreators(
        {
          fetchProducts, 
          setCurrentPage
        },
        dispatch
      );
    }
    
export default connect(mapStateToProps, mapDispatchToProps)(CatalogIndex);