import { useDispatch } from "react-redux"
import { fetchProducts } from "../actions";

export default function Pagination() {
  const dispatch = useDispatch();
  let search = {}

  const handlePageClick = function (e) {
    search = { page: e.target.textContent }
    dispatch(fetchProducts(search))
  }

  return (
    <div className="row">
      <ul className="pagination offset-md-4" onClick={handlePageClick}>
        <li className="page-item"><p className="page-link">1</p></li>
        <li className="page-item"><p className="page-link">2</p></li>
        <li className="page-item"><p className="page-link">3</p></li>
        <li className="page-item"><p className="page-link">4</p></li>
        <li className="page-item"><p className="page-link">5</p></li>
        <li className="page-item"><p className="page-link">6</p></li>
        <li className="page-item"><p className="page-link">7</p></li>
        <li className="page-item"><p className="page-link">8</p></li>
        <li className="page-item"><p className="page-link">9</p></li>
        <li className="page-item"><p className="page-link">10</p></li>
      </ul>
    </div>
  )
}