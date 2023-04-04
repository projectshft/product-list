import { useState } from "react";

const NavBar = ({ onRefresh, onSearch, onCategory, onPrice }) => {
  const [search, setSearch] = useState("");

  const handleCategory = (e) => {
    onCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handlePrice = (e) => {
    onPrice(e.target.value);
  };

  const handleRefresh = () => {
    onRefresh();
    setSearch("");
  };

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <h1 className="navtitle navbar-brand">Mongo Store</h1>
        <button
          value="highest"
          onClick={handlePrice}
          type="button"
          className="btn btn-success"
        >
          High-Low
        </button>
        <button
          value="lowest"
          onClick={handlePrice}
          type="button"
          className="btn btn-danger"
        >
          Low-High
        </button>

        <div className="dropdown" data-bs-theme="dark">
          <button
            className="navbar-toggler btn btn-outline-primary"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {"Category"}
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                value="Animals"
                onClick={handleCategory}
                className="dropdown-item"
              >
                Animals
              </button>
            </li>
            <li>
              <button
                value="Automotive"
                onClick={handleCategory}
                className="dropdown-item"
              >
                Automotive
              </button>
            </li>
            <li>
              <button
                value={"Baby"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Baby
              </button>
            </li>
            <li>
              <button
                value={"Books"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Books
              </button>
            </li>
            <li>
              <button
                value={"Clothing"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Clothing
              </button>
            </li>
            <li>
              <button
                value={"Computers"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Computers
              </button>
            </li>
            <li>
              <button
                value={"Electronics"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Electronics
              </button>
            </li>
            <li>
              <button
                value={"Garden"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Garden
              </button>
            </li>
            <li>
              <button
                value={"Grocery"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Grocery
              </button>
            </li>
            <li>
              <button
                value={"Health"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Health
              </button>
            </li>
            <li>
              <button
                value={"Home"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Home
              </button>
            </li>
            <li>
              <button
                value={"Industrial"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Industrial
              </button>
            </li>
            <li>
              <button
                value={"Jewelery"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Jewelery
              </button>
            </li>
            <li>
              <button
                value={"Kids"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Kids
              </button>
            </li>
            <li>
              <button
                value={"Movies"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Movies
              </button>
            </li>
            <li>
              <button
                value={"Music"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Music
              </button>
            </li>
            <li>
              <button
                value={"Outdoors"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Outdoors
              </button>
            </li>
            <li>
              <button
                value={"Shoes"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Shoes
              </button>
            </li>
            <li>
              <button
                value={"Sports"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Sports
              </button>
            </li>
            <li>
              <button
                value={"Tools"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Tools
              </button>
            </li>
            <li>
              <button
                value={"Toys"}
                onClick={handleCategory}
                className="dropdown-item"
              >
                Toys
              </button>
            </li>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Product Name"
            value={search}
            onChange={handleSubmit}
          ></input>
          <button
            value={""}
            onClick={handleRefresh}
            type="submit"
            className="btn btn-primary"
          >
            Refresh
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
