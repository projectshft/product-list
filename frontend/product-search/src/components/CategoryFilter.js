import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPage } from '../actions';

const CategoryFilter = () => {
  const page = useSelector((state) => state.products.currPage);
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    e.preventDefault();
    // if not on page 1 when category is selected, reset to page 1 before filtering
    if (page !== 1) {
      dispatch(setPage(1));
    };
    dispatch(setCategory(e.target.value));
  };

  return (
    <div>
      <select className="form-select" onChange={(e) => handleSelect(e)}>
        <option value="">Filter by category</option>
        <option value="Beauty">Beauty</option>
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Games">Games</option>
        <option value="Grocery">Grocery</option>
        <option value="Health">Health</option>
        <option value="Home">Home</option>
        <option value="Movies">Movies</option>
        <option value="Shoes">Shoes</option>
        <option value="Sports">Sports</option>
        <option value="Tools">Tools</option>
      </select>
    </div>
  )
};

export default CategoryFilter;