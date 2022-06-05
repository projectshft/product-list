import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { sortCategory } from '../actions';


const CategoryDrop = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const category = e.target.innerHTML;

    dispatch(sortCategory(category));
  }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleClick}>Electronics</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Computers</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Automotive</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Sports</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Clothing</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Jewelery</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Garden</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Home</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Health</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Baby</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Games</Dropdown.Item>
          <Dropdown.Item onClick={handleClick}>Toys</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default CategoryDrop;