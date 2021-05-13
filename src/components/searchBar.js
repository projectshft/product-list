import { getProducts } from '../actions';
import { useDispatch } from 'react-redux';

const SearchBar = (params) => {
  const dispatch = useDispatch();
  const { categoryData } = params
  let options = {}

  const handleCategoryClick = (e) => {
    const selectedCategory = e.target.value;
    console.log(selectedCategory)

    if (selectedCategory === '') {
      options.category = '';
      options.page = 1;
    } else {
      options.page = 1;
      options.category = `category=${selectedCategory}`
    }
    dispatch(getProducts(options));
  }

  const handleSortClick = (e) => {
    const sortSelection = e.target.value;
    console.log(sortSelection)
    if (sortSelection === '') {
      options.sort = ''
      options.page = 1;
    } else {
      options.page = 1;
      options.sort = `sort=${sortSelection}`
    }
    console.log(sortSelection)
    dispatch(getProducts(options));
  }

  const renderCategories = () => {
    const categoryOptionValues = categoryData.map(value => 
      <option key={value} value={value}>{value}</option>
    );
    return categoryOptionValues
  }



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
  )
  }
  
  export default SearchBar