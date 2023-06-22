import { Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { priceSort } from "../features/queryInputSlice";
import { useDispatch } from "react-redux";

const SortByPrice = () => {
  const dispatch = useDispatch();
  const handleSelect = (e) => {
    dispatch(priceSort(e));
  };

  return (
    <>
    <Dropdown>
      <DropdownButton 
        variant="secondary" 
        title="Sort By Price"
        onSelect={handleSelect}>
        <Dropdown.Item eventKey="highest" variant="dark">
          Highest to Lowest
        </Dropdown.Item>
        <Dropdown.Item eventKey="lowest" variant="dark">
          Lowest to Highest
        </Dropdown.Item>
        </DropdownButton>
    </Dropdown>
    </>
  )
}

export default SortByPrice