// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchProducts } from "../actions/fetchProducts";
// import { fetchProducts2 } from "../actions/fetchProducts2";
// import { useEffect } from "react";

// const withoutSearch = {
//   query: "",
//   category: "",
//   price: "",
// };

// const SearchNew = () => {
//   const [search, setSearch] = useState(withoutSearch);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProducts(search));
//   }, [search, dispatch]);

//   function handleSearch(event) {
//     setSearch({
//       ...search,
//       query: event.target.value,
//     });
//   }

//   function handleCategory(event) {
//     setSearch({
//       ...search,
//       category: event.target.value
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setSearch({
//       ...search,
//       query: event.target.value,
//       category: event.target.value,
//     });
//     // console.log(search);
//     dispatch(fetchProducts(search));
//   };

//   return (
//     <div>
//       <form className="searchLine" onSubmit={handleSubmit}>
//         <div className="input-group" id="search">
//           <input
//             type="search"
//             name="query"
//             className="form-control rounded"
//             placeholder="Search"
//             onChange={(event) => handleSearch(event)}
//           ></input>
//           <button type="submit" className="btn btn-outline-primary">
//             Search
//           </button>
//         </div>
//       </form>
//       <div className="input-group-append">
//         <select
//           className="dropdown-toggle"
//           data-toggle="dropdown"
//           onChange= {(event) => handleCategory(event)}
//           value={search.category}
//         >
          
//           <option className="dropdown-item" value="Electronics">
//             Electronics
//           </option>
//         </select>
//       </div>
//       {/* <Dropdown className="drop">
//         <DropdownButton id="dropdown-basic-button" title="Category">
//           <Dropdown.Item
//             onSelect={handleCategory}
//             value="Electronics"
//           >
//             Electronics
//           </Dropdown.Item>
//         </DropdownButton>
//         <DropdownButton id="dropdown-basic-button" title="Price">
//           <Dropdown.Item href="#/action-24">Lowest to Highest</Dropdown.Item>
//           <Dropdown.Item href="#/action-25">Highest to Lowest</Dropdown.Item>
//         </DropdownButton>
//         <br></br>
//         <br></br>
//       </Dropdown> */}
//       <br></br>
//       <br></br>
//     </div>
//   );
// };

// export default SearchNew;
