import { useState } from "react";
//style
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadProductsData } from "../actions/productsAction";

const PageNav = () => {
  // //local state
  const [itemsPerPage] = useState(9);
  //redux
  const dispatch = useDispatch();
  const { products, query } = useSelector((state) => state.products);
  const count = products.count;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(count / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    if (query.length === 0) {
      dispatch(loadProductsData(`?${query}&page=${pageNumber}`));
    } else {
      dispatch(loadProductsData(`${query}&page=${pageNumber}`));
      console.log("click");
    }
  };

  return (
    <StyledPageNav>
      <nav>
        <ul className="pagination">
          Pages:
          {pageNumbers.map((number) => (
            <li key={number} className="pages">
              <a href="!#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </StyledPageNav>
  );
};

const StyledPageNav = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  ul {
    font-size: 2rem;
  }
  li {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    a {
      color: blue;
    }
  }
`;

export default PageNav;
