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
        <option value={`${cat}`} key={index}>cat</option>
      })}

    {/* <option value="Baby" onClick={() => searchByCategory()}>Baby</option>
    <option value="Beauty">Beauty</option>
    <option value="Books">Books</option>
    <option value="Clothing">Clothing</option>
    <option value="Computers">Computers</option>
    <option value="Electronics">Electronics</option>
    <option value="Games">Games</option>
    <option value="Grocery">Grocery</option>
    <option value="Home">Home</option>
    <option value="Jewelry">Jewelry</option>
    <option value="Kids">Kids</option>
    <option value="Movies">Movies</option>
    <option value="Music">Music</option>
    <option value="Outdoors">Outdoors</option>
    <option value="Shoes">Shoes</option>
    <option value="Sports">Sports</option>
    <option value="Tools">Tools</option>
    <option value="Toys">Toys</option> */}
    </select>
  </div>
  )
}

export default SearchBar;