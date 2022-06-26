import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../reducers/productsSlice";
import { filterByPrice } from "../reducers/productsSlice";

const Dropdowns = () => {
  const dispatch = useDispatch();
  const params = useSelector(state => state.products.params);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const [priceSortIsOpen, setPriceSortIsOpen] = useState(false);
 

  const toggleCategory = () => {
    setCategoryIsOpen(!categoryIsOpen);
  };

  const togglePriceSort = () => {
    setPriceSortIsOpen(!priceSortIsOpen);
  }

  const categoryMenuClass = `dropdown-menu ${categoryIsOpen ? " show" : ""}`;
  const priceMenuClass = `dropdown-menu ${priceSortIsOpen ? " show" : ""}`;

  const clickOnCategory = (e) => {
    const category = e.target.innerText;
    dispatch(filterByCategory(category));
    toggleCategory();
  }
 
  const clickOnSortByPrice = (e) => {
    const text = e.target.innerText;
    const sortByPriceArray = text.split(" ");
    const sortByPrice = sortByPriceArray[0].toLowerCase();
    const paramsObj = {
      category: params.category || "",
      query: params.query || "",
      sortByPrice: sortByPrice,
      page: params.page || ""
    }
    dispatch(filterByPrice(paramsObj));
    togglePriceSort();
  }

  return (
  <div className="row">
    <div className="dropdown col-md-2">
      <button  onClick={toggleCategory} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"  data-bs-toggle="dropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort By Category
      </button>
      <div className={categoryMenuClass} aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item" onClick={clickOnCategory}>Electronics</button>
        <button className="dropdown-item" onClick={clickOnCategory}>Home</button>
        <button className="dropdown-item" onClick={clickOnCategory}>Jewelery</button>
      </div>
    </div>
    <div className="dropdown col-md-2 offset-4">
      <button onClick={togglePriceSort} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sort By Price
      </button>
      <div className={priceMenuClass} aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item" onClick={clickOnSortByPrice}>Highest to Lowest</button>
        <button className="dropdown-item" onClick={clickOnSortByPrice}>Lowest to Highest</button>
      </div>
    </div>
  </div>  
  ) 
}

export default Dropdowns;