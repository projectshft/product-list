import SelectList from "./SelectList";

const sortByPriceList = ['Highest', 'Lowest', 'Random']

const sortByCategoryList = [
  'Automotive',  'Baby',
  'Beauty',      'Books',
  'Clothing',    'Computers',
  'Electronics', 'Games',
  'Garden',      'Grocery',
  'Health',      'Home',
  'Industrial',  'Jewelery',
  'Kids',        'Movies',
  'Music',       'Outdoors',
  'Shoes',       'Sports',
  'Tools',       'Toys'
]

const Search = () => {
  return (
    <div className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          name="searchProducts"
          id="searchProducts"
          className="form-control"
          placeholder="Search for a product"
        ></input>
      </div>
      <div className="col-md-3">
        <SelectList
          id="sortByCategory"
          name="sortByCategory"
          list={sortByCategoryList}
        />
      </div>
      <div className="col-md-3">
        <SelectList
          id="sortByPrice"
          name="sortByPrice"
          list={sortByPriceList}
        />
      </div>
    </div>
  );
};

export default Search;
