import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const Pagination = () => {

  const renderPagination = () => {

  }


  return (
    <nav aria-label="Search results pages">
      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  )
};

export default Pagination;
