import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const [category, setCategory] = useState("");
  const [priceSorting, setPriceSorting] = useState("");

  const categories = useSelector((state) =>
    state.products.reduce((acc, product) => {
      if (!acc.includes(product.category)) {
        return [...acc, product.category];
      } else {
        return acc;
      }
    }, [])
  );

  return (
    <div className="container header">
      <div className="row">
        <div className="column col-md-6">
          <input className="form-control" type="text" placeholder="Search" />
        </div>
        <div className="column col-md-3">
          <select
            className="form-select"
            aria-label="Filter By Category"
            onChange={(e) => setCategory(() => e.target.value)}
          >
            <option value={""}>Filter By Category</option>
            {categories.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="column col-md-3">
          <select
            className="form-select"
            aria-label="Sort By Price"
            onChange={(e) => setPriceSorting(() => e.target.value)}
          >
            <option value={""}>Sort By Price</option>
            <option value={"lowest"}>Lowest to Highest</option>
            <option value={"highest"}>Highest to Lowest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
