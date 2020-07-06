import React from 'react';

const SearchBar = () => {

    return (
      
      <div className="container-fluid">
        <div className="row form-group">
            <div className="search-bar input-group col">
              <div className="col-md-4">

                <input type = "text" placeholder="Search for an item" />

              </div>
                <div className="col-md-4">

                  <label for="category-selection">Sort By Category:</label>

                  <select>

                    <option value = "Default">Category</option>
                    <option value = "Home">Home</option>
                    <option value = "Automotive">Automotive</option>
                    <option value = "Shoes">Shoes</option>
                    <option value = "Clothing">Clothing</option>

                  </select>

                </div>

                <div className="col-md-4">

                  <label for="price-sort">Sort By:</label>  

                  <select>
                    <option value = "Default">None</option>
                    <option value = "Lowest">Price: Low to High</option>
                    <option value = "Highest">Price: High to Low</option>
                  </select>

                </div>
              </div>

        </div>
      </div>

    )

};

export default SearchBar;