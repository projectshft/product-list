import React from "react";
import { useSelector } from "react-redux";

export default function PageNavigation() {
  const numOfProducts = useSelector((state) => state.productCount);
  const numOfPages = Math.ceil(numOfProducts / 9);
  const pageLinks = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageLinks.push(
      <li className="page-item">
        <a className="page-link" href="#">
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="row">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-lg justify-content-center">
          {pageLinks.map((link) => link)}
        </ul>
      </nav>
    </div>
  );
}
