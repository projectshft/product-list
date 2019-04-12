import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  return(
    <div className="header">
      <div className="header-bar">
        <h1 className="text-center">PRODUCTS</h1>
      </div>
    
    <div className="input-group">
      <form className="form-inline">
        <input type="text" className="form-control" placeholder="Search for products" />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Filter by Category</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Choose...</option>
              <option value="1">Jewelery</option>
              <option value="2">Tools</option>
              <option value="3">Industrial</option>
            </select>
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" for="inlineFormCustomSelect">Sort By:</label>
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>Choose...</option>
              <option value="1">Price: Low to High</option>
              <option value="2">Price: High to Low</option>
            </select>
          </div>
        
      
      </form>
      

    </div>
  </div>
  )
}


