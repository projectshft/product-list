import "./App.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


function App() {
  return (
    <div className="search-header">
      <input
        type="text"
        className="search-block"
        placeholder="Search Products..."
      />

      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        title="Sort by Category"
      >
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        title="Sort by Price"
      >
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default App;
