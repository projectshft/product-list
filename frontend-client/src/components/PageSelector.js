import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageSelector = () => {
  const count = useSelector(({products}) => products.count);
  const currentPage = useSelector(({currentPage}) => currentPage);
  const productsPerPage = 9;
  const numberOfPages = Math.ceil(count/productsPerPage);

  const generatePreviousButton = (currentPage) => {
    const classes = currentPage === 1 ? "page-item disabled" : "page-item";
    const linkUrl = `/products?page=${currentPage-1}`;
    return (
      <li className={classes}><Link className="page-link" to={linkUrl}>Previous</Link></li>
    )
  }

  const generateNextButton = (currentPage, finalPage) => {
    const classes = currentPage === finalPage ? "page-item disabled" : "page-item";
    const linkUrl = `/products?page=${currentPage+1}`;
    return (
      <li className={classes}><Link className="page-link" to={linkUrl}>Next</Link></li>
    )
  }

  const generatePaginationButton = (pageNumber, currentPage) => {
    const classNames = pageNumber === currentPage ? "page-item active" : "page-item";
    const linkUrl = `/products?page=${pageNumber}`;
    return (
      <li className={classNames}><Link className="page-link" to={linkUrl}>{pageNumber}</Link></li>
    )
  }
  
  const generatePaginationButtons = (currentPage, numberOfPages) => {
    let paginationButtons = [];
    for (let i = 1; i <= numberOfPages; i++) {
     paginationButtons.push(generatePaginationButton(i, currentPage))
    }
    return paginationButtons;
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <ul className="pagination justify-content-center">
          {generatePreviousButton(currentPage)}
          {generatePaginationButtons(currentPage, numberOfPages)}
          {generateNextButton(currentPage, numberOfPages)}
        </ul>
      </div>
    </div>
  )
}

export default PageSelector;