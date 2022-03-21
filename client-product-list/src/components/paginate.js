import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from '../actions';
import { useState } from 'react';

const Paginate = () => {

  const totalCount = useSelector(state => state.total);
  const {query, category, price} = useSelector(state => state.filter);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();

  const handleItemClick = (index) => {
    let page = index + 1;
    // dispatch(setPageFilter(index + 1));
    dispatch(fetchProducts(query, category, price, page));
    setCurrPage(index + 1)
  }

  const handlePrevClick = () => {
    dispatch(fetchProducts(query, category, price, currPage - 1));
    setCurrPage(currPage - 1)
  }

  const handleNextClick = () => {
    dispatch(fetchProducts(query, category, price, currPage + 1));
    setCurrPage(currPage + 1)
  }


  const renderPaginatedPages = () => {
    const numOfPages = Math.ceil(totalCount / 9);

    return (
      <Pagination>
          <Pagination.Prev onClick={handlePrevClick} />
          {Array.from({ length: numOfPages }).map((item, idx) => (
          <Pagination.Item key={idx}
            active={idx + 1 === currPage}
            onClick={() => handleItemClick(idx)}>{idx + 1}</Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextClick}/>
        </Pagination>
    )

  }

  return (
    <Row>
      <Col>
        {renderPaginatedPages()}
      </Col>
    </Row>
  )
}

export default Paginate;