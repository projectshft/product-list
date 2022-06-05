import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { sortProducts } from '../actions';

const PriceDrop = () => {
  const dispatch = useDispatch();
  const highToLow = () => {
    dispatch(sortProducts("highest"));
  };

  const lowToHigh = () => {
    dispatch(sortProducts("lowest"));
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={highToLow}>Highest to Lowest</Dropdown.Item>
          <Dropdown.Item onClick={lowToHigh}>Lowest to Highest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default PriceDrop;