import { useSelector } from 'react-redux';
import { fetchProducts } from '../actions';
import { useDispatch } from 'react-redux';
import './Pagination.css';

const Pagination = () => {
    const options = useSelector(state => state.options);
    const highestPage = useSelector(state => Math.ceil(state.products.length));
    const dispatch = useDispatch();

    const handlePagination = evt => {
        dispatch(fetchProducts({...options, page: evt.target.name}));
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {Number(options.page) > 1 ? <li className="page-item"><button name={Number(options.page) - 1} onClick={handlePagination} className="page-link">Previous</button></li> : null}
                {Number(options.page) > 1 ? <li className="page-item"><button name={Number(options.page) - 1} onClick={handlePagination} className="page-link">{Number(options.page) - 1}</button></li> : null}
                {highestPage > 0 ? <li className="page-item active" aria-current="page"><button name={Number(options.page)}className="page-link">{Number(options.page)}</button></li> : null}
                {Number(options.page) < highestPage ? <li className="page-item"><button name={Number(options.page) + 1} onClick={handlePagination} className="page-link">{Number(options.page) + 1}</button></li> : null}
                {Number(options.page) < highestPage ? <li className="page-item"><button name={Number(options.page) + 1} onClick={handlePagination} className="page-link">Next</button></li> : null}
            </ul>
        </nav>
    )
};

export default Pagination;