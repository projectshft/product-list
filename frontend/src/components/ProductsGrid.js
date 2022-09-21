import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from '../util/Pagination';

const ProductsGrid = () => {
  const products = useSelector((state) => state.productState)
  if(products.length > 0){
    const docsArray = products[0].productsArray
    const paginateArray = []
    const currentPage = products.currentPage
    const totalPages = products.totalPages
    const totalDocs = products.totalDocs

    return(
      <div>
        <Container>
        <Row>
        {docsArray.map((doc) => {
          return(
            <Col md={4} sm={6}>
            <Product doc={doc} key={doc._id} />
          </Col>
            )
          })}
        </Row>

        </Container>
      </div>
    )

  } else {
    console.log(`nothing`)
    return (
      <div>
        <h2>No products to display</h2>
        <h3>Try a new search!</h3>
      </div>
    )
  }
}

export default ProductsGrid