import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';
import { categorySearch } from '../features/queryInputSlice';


const CategorySearch = () => {
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    dispatch(categorySearch(e));
  };

  return (
    <>
    <Dropdown>
      <DropdownButton 
        variant="secondary" 
        title="Filter By Category"
        onSelect={handleSelect}>
        <Dropdown.Item eventKey="Baby" variant="dark">
          Baby
        </Dropdown.Item>
        <Dropdown.Item eventKey="Electronics" variant="dark">
          Electronics
        </Dropdown.Item>
        <Dropdown.Item eventKey="Grocery" variant="dark">
          Grocery
        </Dropdown.Item>
        <Dropdown.Item eventKey="Garden" variant="dark">
          Garden
        </Dropdown.Item>
        <Dropdown.Item eventKey="Books" variant="dark">
          Books
        </Dropdown.Item>
        <Dropdown.Item eventKey="Outdoors" variant="dark">
          Outdoors
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
    </>
  )
}

export default CategorySearch