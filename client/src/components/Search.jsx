import SelectList from "./SelectList";

const sortList = ['Highest', 'Lowest', 'Random']

const categoryList = [
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
    <form>
      <input type="search" className="form-control" placeholder="Search for a product"></input>
      <SelectList id="filter" name="filter" list={categoryList} />
      <SelectList id="sort" name="sort" list={sortList} />
    </form>
  );
};

export default Search;
