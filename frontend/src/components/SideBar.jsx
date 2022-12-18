import PropTypes from 'prop-types';
import { useGetCategoriesQuery } from '../services/products';
import SearchBar from './SearchBar';

const SideBar = ({ onCategoryChange, onSortChange, sort, category, onSearchChange }) => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  let categoryRadioButtons;

  if (error) {
    categoryRadioButtons = <div>Error...</div>;
  } else if (isLoading) {
    categoryRadioButtons = <div>Loading...</div>;
  } else if (data) {
    categoryRadioButtons = data.map((categoryElement) => (
      <div key={categoryElement} className="flex">
        <input type="radio" value={categoryElement} name="category" id={categoryElement} />
        <label className="ml-3" htmlFor={categoryElement}>
          {categoryElement}
        </label>
      </div>
    ));
  }

  return (
    <div className="h-full w-64 border">
      <div className="">
        <div>
          <SearchBar onSearchChange={onSearchChange} />
        </div>
        {/* SORT SECTION */}
        <div className="p-5 border-b">
          <div className="font-semibold">Sort By</div>
          <div className="flex flex-col" onChange={onSortChange}>
            <div className="flex">
              <input type="radio" value="" name="sort" id="featured" defaultChecked={sort === ''} />
              <label className="pl-3" htmlFor="featured">
                Featured
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                value="nameAscending"
                name="sort"
                id="nameAscending"
                defaultChecked={sort === 'nameAscending'}
              />
              <label className="pl-3" htmlFor="nameAscending">
                Name: Ascending
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                value="nameDescending"
                name="sort"
                id="nameDescending"
                defaultChecked={sort === 'nameDescending'}
              />
              <label className="pl-3" htmlFor="nameDescending">
                Name: Descending
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                value="priceLowest"
                name="sort"
                id="priceLowest"
                defaultChecked={sort === 'priceLowest'}
              />
              <label className="pl-3" htmlFor="priceLowest">
                Price: Lowest
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                value="priceHighest"
                name="sort"
                id="priceHighest"
                defaultChecked={sort === 'priceHighest'}
              />
              <label className="pl-3" htmlFor="priceHighest">
                Price: Highest
              </label>
            </div>
          </div>
        </div>
        {/* Category Section */}
        <div className="p-5">
          <div className="font-semibold py-3">Category</div>
          <div className="flex flex-col" onChange={onCategoryChange}>
            <div className="flex">
              <input type="radio" value="" name="category" id="all" defaultChecked={category === ''} />
              <label className="pl-3" htmlFor="all">
                All
              </label>
            </div>
            {categoryRadioButtons}
          </div>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  onCategoryChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sort: PropTypes.string,
  category: PropTypes.string,
};

export default SideBar;
