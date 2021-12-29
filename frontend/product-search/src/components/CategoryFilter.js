import { useDispatch } from 'react-redux';
import { setCategory } from '../actions';

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    e.preventDefault();
    dispatch(setCategory(e.target.value));
  };

  return (
    <div>
      <select className="form-select" onChange={(e) => handleSelect(e)}>
        <option value="">Filter by category</option>
        <option value="Beauty">Beauty</option>
        <option value="Shoes">Shoes</option>
        <option value="Sports">Sports</option>
        <option value="Tools">Tools</option>
      </select>
    </div>
  )
};

export default CategoryFilter;