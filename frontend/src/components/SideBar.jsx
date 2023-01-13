import PropTypes from 'prop-types';
import { useGetCategoriesQuery } from '../services/products';
import SearchBar from './SearchBar';

const SideBar = ({ onCategoryChange, onSortChange, category, onSearchChange }) => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  let categoryOptions;

  if (error) {
    categoryOptions = <div>Error...</div>;
  } else if (isLoading) {
    categoryOptions = <div>Loading...</div>;
  } else if (data) {
    categoryOptions = data.map((option, idx) => {
      if (idx === 0) {
        return <option value="">All</option>;
      }
      return (
        <option value={option} name={category} id={option}>
          {option}
        </option>
      );
    });
  }

  return (
    <div className="flex items-center justify-center mb-4">
      <SearchBar onSearchChange={onSearchChange} />
      {/* SORT SECTION */}
      <div className="flex items-center">
        <div className=" flex items-center">
          <div className="mx-2">Sort By:</div>
          <select className="border px-2 py-1" name="sort" id="sort" onChange={onSortChange}>
            <option value="">Featured</option>
            <option value="nameAscending">Name A-Z</option>
            <option value="nameDescending">Name Z-A</option>
            <option value="priceLowest">Price Low to High</option>
            <option value="priceHighest">Price High to Low</option>
          </select>
        </div>
        {/* Category Section */}
        <div className="flex items-center">
          <div className="mx-2">Category:</div>
          <select className="border px-2 py-1" name="category" id="category" onChange={onCategoryChange}>
            {categoryOptions}
          </select>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  onCategoryChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  category: PropTypes.string,
};

export default SideBar;
