import React, {Component} from 'react';

//searching is ONLY required for extension 2;

  class SearchBar extends Component {
    render() {
    return (
      <div className="container-fluid">
        <div className="row form-group">
            <div className="search-bar input-group col">
              <div className="col-md-4">
                <input type = "text" placeholder="Search" />
              </div>
                <div className="col-md-4">
                  <label htmlFor="category-selection">Filter By Category:</label>
                  <select>
                    <option value = "Default">Choose Category</option>
                    <option value = "Jewelry">Jewelry</option>
                    <option value = "Home">Home</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="price-sorting">Sort By:</label>  
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
  }
}

export default SearchBar;