import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';
import { sortProducts } from '../actions';


const CategoryDrop = (props) => {
  const dispatch = useDispatch();
  const price = props.price;
  const query = props.query;

  const handleClick = (e) => {
    const category = e.target.innerHTML;

    if(price !== "" && query !== ""){
      dispatch(sortProducts(price, category, query));
      props.setCat(category)
      props.setPages(1);
      props.setPage(1);
    } else if(price === "" && query !== ""){
      dispatch(sortProducts(undefined, category, query));
      props.setCat(category)
      props.setPages(1);
      props.setPage(1);
    } else if(price !== "" && query === ""){
      dispatch(sortProducts(price, category));
      props.setCat(category)
      props.setPages(1);
      props.setPage(1);
    } else if(price === "" && query === "") {
      dispatch(sortProducts(undefined, category));
      props.setCat(category);
      props.setPages(1);
      props.setPage(1);
    }

  };

  const handleNone = () => {
    if(price !== "" && query !== ""){
      dispatch(sortProducts(price, undefined, query));
      props.setCat("")
      props.setPages(1);
      props.setPage(1);
    } else if(price === "" && query !== ""){
      dispatch(sortProducts(undefined, undefined, query));
      props.setCat("")
      props.setPages(1);
      props.setPage(1);
    } else if(price !== "" && query === ""){
      dispatch(sortProducts(price));
      props.setCat("")
      props.setPages(10);
      props.setPage(1);
    } else if(price === "" && query === ""){
      dispatch(sortProducts());
      props.setCat("");
      props.setPages(10);
      props.setPage(1);
    }
  }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleNone}>None</Dropdown.Item>
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