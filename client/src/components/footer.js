import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { changePage } from "../actions/index";



const Footer = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    let page = e.target.innerHTML;
    dispatch(changePage(page));
  };

  const count = useSelector((state) => state.reducer.count);
  let numPages = Math.ceil(count / 9);

  const generatePages = () => {
    let arr = []
    for (let i=0; i<numPages; i++) {
      arr.push(i+1)
    }
    return arr.map((index) => {
      return (
        <button key={index} onClick={handleClick}>{index}</button>
      )
    });
  }

  return (
    <div className="d-flex justify-content-center">
      {generatePages()}
    </div>
  )
};

export default Footer;