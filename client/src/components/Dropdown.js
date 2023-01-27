import React from 'react'
import { useState } from 'react'
import './Dropdown.css';
import { BiCaretDown } from 'react-icons/bi'

const Dropdown = () => {
  const [menuOne, setMenuOne] = useState(false);
  const [menuTwo, setMenuTwo] = useState(false);

  const handleMenu1 = () => {
    setMenuOne(!menuOne);
  };

  const handleMenu2 = () => {
    setMenuTwo(!menuTwo);
  };

  return (
    <div className="container">
      <input type="search" placeholder="Search"></input>

      <div className="dropdown-1">
        <div className="dropdown-label">
          <p>Sort by Category</p>
          <div className="dropdown-button" onClick={handleMenu1}>
          <span className="arrow"><BiCaretDown/></span>
          </div>
        </div>

        { menuOne ? (
          <ul className="menu"> 
            <li className="menu-item">Garden</li>
            <li className="menu-item">Movies</li>
            <li className="menu-item">Home</li>
            <li className="menu-item">Industrial</li>
          </ul> 
        ) : null}
      </div>

      <div className="dropdown-2">
        <div className="dropdown-label">
          <p>Sort by Price</p>
          <div className="dropdown-button" onClick={handleMenu2}>
          <span className="arrow"><BiCaretDown/></span>
          </div>
        </div>

        { menuTwo ? (
          <ul className="menu"> 
            <li className="asc">Lowest to Highest</li>
            <li className="desc">Highest to Lowest</li>
          </ul> 
        ) : null}
      </div>
    </div>
  ) 
} 

export default Dropdown