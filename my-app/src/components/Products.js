import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image, Button} from "react-bootstrap";
import { getProducts, setCurrentPage } from "../actions";
import { useEffect, useState } from "react";

const Products = () => {

  

  const productResponse = useSelector((state) => state.products);
  const currentPage = useSelector((state) => state.pages.currentPage);

  const dispatch = useDispatch();

  const ProductList = () => {
    const rows = [];
    const productObj = productResponse.products;

    if (!productObj.data) {
      return null
    }
    
    const productData = productObj.data.products;

    for (let i=0; i < productObj.data.products.length; i++) {
      rows.push(
        <Col className="mb-5" xs={4} key={i}>
            <Row>
              <Col xs={{span: 8, offset: 2}} style={{backgroundColor: 'white'}}>
                <Row>
                  <Col className="mt-3" xs={8}>
                    <div>
                      <span>Category:</span>
                      <span className="fw-bold"> {productData[i].category}</span>
                    </div>
                  </Col>
                  <Col xs={4}>
                    <h2 className="text-end">{productData[i].price}</h2>
                  </Col>
                </Row>
                <img src="https://www.papo-france.com/669/t-rex.jpg" className="mb-2" height={'300rem'} width={'100%'} alt='...'/>
                <Row>
                  <Col>
                    <div>
                      <h1>{productData[i].name}</h1>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
      )
    }

    return rows;
  }

  const PageNumbers = () => {

    const productObj = productResponse.products;

    if (!productObj.data) {
      return null
    }

    const count = productObj.data.productCount;
    const pages = count / 9;

    const pageNumbers = [];

    const handlePageClick = (e) => {
      const pageNumber = parseInt(e.target.innerHTML.replace(/\s/g, ''));
      dispatch(setCurrentPage(pageNumber))
      console.log(currentPage)  
    }

    for (let i=0; i < pages; i++) {
      pageNumbers.push(
        <span key={i} onClick={handlePageClick}> {i+1} </span>
      )
    }

    
    return (
      <>
      <Row>
        <Col className="text-center" xs={{span: 8, offset: 2}}>
          {pageNumbers}
        </Col>
      </Row>
      <Row>
        <Col className="text-center" xs={{span: 8, offset: 2}}>
          Current Page: {currentPage}
        </Col>
      </Row>
      </>
    )

  }


  return (
    <>
    <Row className="my-5">

      <Col>
        <Row className="mb-5">
          <ProductList />
        </Row>
      </Col>
      <PageNumbers />
    </Row>

    </>
  )
}

export default Products;