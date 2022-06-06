import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { sortProducts } from '../actions';

const PriceDrop = (props) => {
  const dispatch = useDispatch();
  const category = props.category;
  const query = props.query;
  console.log(query)

  const highToLow = () => {
    if(category !== "" && query !== ""){
      dispatch(sortProducts("highest", category, query));
      props.setPrice("highest")
      props.setPages(1);
      props.setPage(1);
    } else if(category !== "" && query === ""){
      dispatch(sortProducts("highest", category));
      props.setPrice("highest")
      props.setPages(1);
      props.setPage(1);
    } else if(category === "" && query !== ""){
      dispatch(sortProducts("highest", undefined, query));
      props.setPrice("highest")
      props.setPages(1);
      props.setPage(1);
    } else if(category === "" && query === ""){
      dispatch(sortProducts("highest"));
      props.setPrice("highest")
      props.setPages(10);
      props.setPage(1);
    }
  };

  const lowToHigh = () => {
    if(category !== "" && query !== ""){
      dispatch(sortProducts("lowest", category, query));
      props.setPrice("lowest")
      props.setPages(1);
      props.setPage(1);
    } else if(category === "" && query !== ""){
      dispatch(sortProducts("lowest", undefined, query));
      props.setPrice("lowest")
      props.setPages(1);
      props.setPage(1);
    } else if(category !== "" && query === ""){
      dispatch(sortProducts("lowest", category));
      props.setPrice("lowest")
      props.setPages(1);
      props.setPage(1);
    } else if(category === "" && query === ""){
      dispatch(sortProducts("lowest"));
      props.setPrice("lowest")
      props.setPages(10);
      props.setPage(1);
    }
  };

  const handleNone = () => {
    if(category !== "" && query !== ""){
      dispatch(sortProducts(undefined, category, query));
      props.setPrice("");
      props.setPages(1);
      props.setPage(1);
    } else  if(category === "" && query !== ""){
      dispatch(sortProducts(undefined, undefined, query));
      props.setPrice("");
      props.setPages(1);
      props.setPage(1);
    } else if(category !== "" && query === ""){
      dispatch(sortProducts(undefined, category, undefined));
      props.setPrice("");
      props.setPages(1);
      props.setPage(1);
    } else if(category === "" && query === ""){
      dispatch(sortProducts());
      props.setPrice("");
      props.setPages(10);
      props.setPage(1);
    }
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleNone}>None</Dropdown.Item>
          <Dropdown.Item onClick={highToLow}>Highest to Lowest</Dropdown.Item>
          <Dropdown.Item onClick={lowToHigh}>Lowest to Highest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default PriceDrop;