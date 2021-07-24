import { useState } from "react";
//style
import styled from "styled-components";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loadProductsData } from "../actions/productsAction";
import { loadQuery } from "../actions/queryAction";

const PageNav = () => {
  const dispatch = useDispatch();
  const { products, query } = useSelector((state) => state.products);

  //local state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const count = products.count;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(count / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
    const newQuery = `${query}?page=${currentPage}`;
    dispatch(loadQuery(newQuery));
    //dispatch(loadProductsData(newQuery));
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
