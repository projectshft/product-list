import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { fetchProducts } from '../helpers/fetchData';
import { setProducts } from '../actions';

const PageNumbers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { numProducts } = useSelector(state => state.products);
  const perPage = 9;
  const numPages = numProducts / perPage;

  const {category, priceSort, query} = useSelector(state => state.filters);

  const dispatch = useDispatch();

  const handlePageChange = async (e) => {
    setCurrentPage(Number(e.target.id) + 1);

    const page = Number(e.target.id) + 1;

    const {products} = await fetchProducts(category, priceSort, page, query);

    dispatch(setProducts(products))
  }

  const renderPageNumbers = () => {
    let pageNumbers = []
    for (let i = 0; i < numPages; i++) {
      pageNumbers.push(
        <Col
          onClick={e => handlePageChange(e)}
          key={i} id={i}
          as='a' className="page-number"
        >
          {i + 1}
        </Col>
      )
    }
    return pageNumbers;
  }
  return (
    <Row className="mb-5 mt-2 justify-content-md-center">
      {renderPageNumbers()}
      <div className='text-center'>
        Current Page: {currentPage}
      </div>
    </Row>
  );
}

export default PageNumbers;
