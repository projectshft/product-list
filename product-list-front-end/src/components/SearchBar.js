const SearchBar = () => {
  
  const searchByCategory = () => {
    console.log('test');
  }

  const categories = ['Baby', 'Beauty', 'Books', 'Clothing', 'Computers', 'Electronics', 'Games', 'Grocery', 'Home', 'Jewelry', 'Kids', 'Movies', 'Music', 'Outdoors', 'Shoes', 'Sports', 'Tools', 'Toys'];

  return (
  <div>
    <input type="text" placeholder="Search"/>
    <select>
      {categories.map((cat, index) => {
        return <option value={`${cat}`} key={index}>{cat}</option>
      })}
    </select>
  </div>
  )
}

export default SearchBar;