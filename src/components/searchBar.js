const SearchBar = () => {
  return (
    <div className="container-fluid p-4">
      <form>
        <div className="row">
          <div className="col-7">
            <input type="text" className="form-control col mr-1 mt-1 mb-1" />
          </div>
            <select className="custom-select col m-1">
                  <option value="1">Filter by Category</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
            </select>
            <select className="custom-select col m-1" defaultValue="Choose...">
                  <option value="1">Sort by Price</option>
                  <option value="2">Highest</option>
                  <option value="3">Lowest</option>
            </select>
        </div>
      </form>
    </div>
  )
  }
  
  export default SearchBar