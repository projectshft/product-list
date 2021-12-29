import { useDispatch } from 'react-redux';
import { setSort } from '../actions';

const SortPrice = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    e.preventDefault();
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