import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';

const SearchBar = (params) => {
  const dispatch = useDispatch();
  const { categoryData } = params
  let options = {}

  const handleCategoryClick = (e) => { // dispatch product fetch given w/ selected category
    const selectedCategory = e.target.value;
    options.page = `page=1`; // new categories default to displaying on page 1 of results

    if (selectedCategory === '') { // "undo" category selection
      options.category = '';
    } else { // create category query string and pass to dispatch
      options.category = `category=${selectedCategory}`;
    };

    dispatch(getProducts(options));
  };

  const handleSortClick = (e) => { //dispatch product fetch given w/ sort option
    const sortSelection = e.target.value;
 
    if (sortSelection === '') { // "undo" sort 
      options.sort = '';
    } else { // create sort query string and pass to dispatch
      options.sort = `sort=${sortSelection}`;
    }

    dispatch(getProducts(options));
  };

  const renderCategories = () => { // generate cateogy options
    const categoryOptionValues = categoryData.map(value => 
      <option key={value} value={value}>{value}</option>
    );
    return categoryOptionValues;
  };

  return (
    <div className="container-fluid p-4">
      <form>
        <div className="row">
          <div className="col-7">
            <input type="text" className="form-control col mr-1 mt-1 mb-1" />
          </div>
            <select className="custom-select col m-1" onChange={(e) => handleCategoryClick(e)}>
              <option value={''} >Filter by Category</option>
              {renderCategories()}
            </select>
            <select className="custom-select col m-1" defaultValue="Choose..." onChange={(e) => handleSortClick(e)}>
              <option value="">Sort by Price</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
        </div>
      </form>
    </div>
  );
};
  
export default SearchBar