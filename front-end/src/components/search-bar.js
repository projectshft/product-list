function SearchBar() {
return (
  <div className='row'>
    <div className='col-md-6 offset-md-1'>
      <div className='input-group'>
        <input type='text' className='form-control' placeholder='Product Search'></input>
      </div>
    </div>
    <div className='col-md-2'> 
      <select className="form-control" name="category" >
        <option>Sort by Category</option>
        <option value="Automotive">Automotive</option>
        <option value="Clothing">Clothing</option>
        <option value="Kids">Kids</option>
        <option value="Home">Home</option>
        <option value="Games">Games</option>
        <option value="Sports">Sports</option>         
      </select>
    </div>
    <div className='col-md-2'> 
      <select className="form-control" name="category" >
        <option>Sort by Price</option>
        <option value="Highest">Highest</option>
        <option value="Lowest">Lowest</option>         
      </select>
    </div>
  </div>
)
}

export default SearchBar