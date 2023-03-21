import { useState } from "react";

const Nav = ({ onSearch, chooseCategory, handlePrice  }) => {
  const [search, setSearch] = useState("");
  const [category, setCategoies] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
    console.log(search);
    setSearch("");
  };

  const priceBtn = (e) => {
    handlePrice(e)
    console.log(e)
  };

  const handleCategory = (e) => {
    chooseCategory(e);
    console.log(e);
  };

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <h1 className="navtitle navbar-brand">Mongo Store</h1>
        <button onClick={() => priceBtn("highest")} type="button" className="btn btn-success">
          High-Low
        </button>
        <button onClick={() => priceBtn("lowest")} type="button" className="btn btn-danger">
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
                onClick={() => handleCategory("Animals")}
                className="dropdown-item"
              >
                Animals
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Automotive")}
                className="dropdown-item"
              >
                Automotive
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Baby")}
                className="dropdown-item"
              >
                Baby
              </button>
            </li>
            <li>
              <button
                value="books"
                onClick={(e) => setCategoies(e.target.value)}
                className="dropdown-item"
              >
                Books
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Clothing")}
                className="dropdown-item"
              >
                Clothing
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Computers")}
                className="dropdown-item"
              >
                Computers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Electronics")}
                className="dropdown-item"
              >
                Electronics
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Garden")}
                className="dropdown-item"
              >
                Garden
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Grocery")}
                className="dropdown-item"
              >
                Grocery
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Health")}
                className="dropdown-item"
              >
                Health
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Home")}
                className="dropdown-item"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Industrial")}
                className="dropdown-item"
              >
                Industrial
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Jewelery")}
                className="dropdown-item"
              >
                Jewelery
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Kids")}
                className="dropdown-item"
              >
                Kids
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Movies")}
                className="dropdown-item"
              >
                Movies
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Music")}
                className="dropdown-item"
              >
                Music
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Outdoors")}
                className="dropdown-item"
              >
                Outdoors
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Shoes")}
                className="dropdown-item"
              >
                Shoes
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Sports")}
                className="dropdown-item"
              >
                Sports
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Tools")}
                className="dropdown-item"
              >
                Tools
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategory("Toys")}
                className="dropdown-item"
              >
                Toys
              </button>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Product Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
