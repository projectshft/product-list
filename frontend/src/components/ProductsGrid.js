import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getProducts } from '../actions/actions';

const ProductsGrid = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productState)
  if(products.length > 0){
    const docsArray = products[0].productsArray
    const paginateArray = []
    const currentPage = products[0].currentPage
    const totalPages = products[0].totalPages
    const totalDocs = products.totalDocs
    const searchTerms = products[0].searchTerm
    for (let index = 1; index <= totalPages; index++) {
      paginateArray.push(index)
      
    }
    const pageClickHandler = (e) => {
      searchTerms.page = e.target.value
      e.preventDefault()
      dispatch(getProducts(searchTerms))
    }
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
        <div className='paginate-div'>
          <ul>
        {
          paginateArray.map((pag) => {
            return(
              <li 
              className=
              {
              pag === currentPage ? "active" : "" }
              key={pag} 
              value={pag} 
              onClick={pageClickHandler}>{pag}</li>
            )
          })
        }
        </ul>
          </div>
      </div>
    )

  } else {
    return (
      <div>
        <h2>No products to display</h2>
        <h3>Try a new search!</h3>
      </div>
    )
  }
}

export default ProductsGrid