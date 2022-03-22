import { Container, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_SET, PAGE_SET, CATEGORY_SET, PRICE_SORT_SET  } from '../actions';
import { setSearchSetting } from '../actions';
 
const PageLinks = () => {
  const pages = useSelector((state) => state.main.totalPages);

  const dispatch = useDispatch();

  const handleButtonClick = (pageNumber) => {
    dispatch(setSearchSetting(PAGE_SET, pageNumber));
  }

  return (
    <Container>
      <Row>
        <Col />      
          {[...Array(pages).keys()].map((num) => <Col md={1} key={num}><Button variant='link' value={num + 1} onClick={(e) => {handleButtonClick(e.target.value)}}>Pg {num + 1}</Button></Col>)}
        <Col />
      </Row>
    </Container>
  )
}

export default PageLinks;
