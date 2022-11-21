import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputGroup, FormControl } from 'react-bootstrap';
import { fetchProducts, fetchCategories } from '../product/productSlice';

const Prompt = () => {
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const { categories } = useSelector(state => state.inventory);
  const dispatch = useDispatch();

 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(fetchProducts({key: 'query', value: e.target.value}));
      e.target.value = '';
    }
  }

  const handleCategory = (e) => {
    dispatch(fetchProducts({ key : "category", value:  e }));
  }
  const handleSort = (e) => {
    dispatch({ type: "inventory/sortByPrice", payload: e });
  }
  return (
    <div>
      <Container className="prompt" fluid>
        <Row>
          <Col>
            <InputGroup>
              <FormControl
                placeholder="Search"
                type="text"
                onKeyDown={handleKeyDown}
              />  
            </InputGroup>
          </Col>
          <Col className='buttonBundle'>          
            <DropdownButton 
              title="Search by category" 
              onSelect={handleCategory} 
              className="dropdownCat">
                { categories.map((product) => {
                    return (
                    <Dropdown.Item
                      key= {product} 
                      eventKey= {product}>
                        {product} 
                    </Dropdown.Item>)
                  })
                } 
            </DropdownButton>
       
            <DropdownButton 
              title="Sort by price" 
              onSelect={handleSort} 
              className="dropdownPrice">
                <Dropdown.Item eventKey="lowest">Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="highest">High to Low</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>  
    </div>  
  )
}
export default Prompt;