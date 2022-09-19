import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fetchProducts } from '../actions/index';

export default function Pagination() {
  const dispatch = useDispatch();
  const productData = useSelector(({ products }) => {
    console.log(products);
    return products;
  });

  function handleChangePage(e) {
    dispatch(
      fetchProducts({ ...productData.previousQuery, page: e.target.tabIndex })
    );
  }
  function handleKeyDown(e) {
    console.log(e.keyCode);
  }

  function renderPagination() {
    const pages = Array.from(
      { length: productData.data.totalPages },
      (dummyVar, i) => i + 1
    );

    const pageButtons = pages.map((page) => (
      <li className="page-item" key={page}>
        <a
          className="page-link"
          value={page}
          onClick={(e) => handleChangePage(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          role="button"
          tabIndex={page}
        >
          {page}
        </a>
      </li>
    ));
    return pageButtons;
  }

  return _.isEmpty(productData.data) ? (
    <div />
  ) : (
    <nav aria-label="Page navigation" className="page__nav">
      <ul className="pagination justify-content-center">
        {renderPagination()}
      </ul>
    </nav>
  );
}
