import { useDispatch, useSelector } from 'react-redux';
import { setSort, setPage } from '../actions';

const SortPrice = () => {
  const page = useSelector((state) => state.products.currPage);
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    e.preventDefault();
    // if not on page 1 when option is selected, reset to page 1 before sorting
    if (page !== 1) {
      dispatch(setPage(1));
    };
    dispatch(setSort(e.target.value));
  };

  return (
    <div>
      <select className="form-select" onChange={(e) => handleSelect(e)}>
        <option value="">Sort by price</option>
        <option value="highest">Highest to lowest</option>
        <option value="lowest">Lowest to highest</option>
      </select>
    </div>
  )
};

export default SortPrice;