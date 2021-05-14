import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';

const SearchBar = (params) => {
  const dispatch = useDispatch();
  const { categoryData } = params;
  let options = {};

  const renderCategories = () => { // autofill categories 
    const categoryOptionValues = categoryData.map(value => 
      <option key={value} value={value}>{value}</option>
    );
    return categoryOptionValues;
  };

  const handleCategoryClick = (e) => { // dispatch product fetch given selected category
    const selectedCategory = e.target.value;
    options.page = `page=1`; // new categories default to displaying on page 1 of results

    if (selectedCategory === '') { // selecting "Select a Category" itself will display all results
      options.category = '';
    } else { // create category query string and pass to dispatch
      options.category = `category=${selectedCategory}`;
    };

    dispatch(getProducts(options));
  };

  const handleSortClick = (e) => { //dispatch product fetch w/ sort option
    const sortSelection = e.target.value;
    options.page = `page=1`; // return to page 1
 
    if (sortSelection === '') { // selecting "Filter by Price" itself will unfilter results
      options.sort = '';
    } else { // create sort query string and pass to dispatch
      options.sort = `sort=${sortSelection}`;
    }

    dispatch(getProducts(options));
  };

  const handleSearch = (e) => { //dispatch product fetch w/ search term
    if (e.key === 'Enter') {
      const searchTerm = e.target.value;
      options.page = `page=1`; // return to page 1
      
      if (searchTerm === '') { // an empty search will return all products
        options.name = '';
      } else { // create search query string and pass to dispatch
        options.name = `name=${searchTerm}`;
      };

      dispatch(getProducts(options));
    };
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-7">
          <input type="text" className="form-control col mr-1 mt-1 mb-1" onKeyDown={(e) => handleSearch(e)}/>
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
    </div>
  );
};
  
export default SearchBar;