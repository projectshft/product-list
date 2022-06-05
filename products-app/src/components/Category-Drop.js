import Dropdown from 'react-bootstrap/Dropdown'


const CategoryDrop = () => {
  const handleClick = (e) => {
    console.log(e)
  }
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleClick}>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default CategoryDrop;