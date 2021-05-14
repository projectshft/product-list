const SearchBar = () => {
  return (
    <div className="row mt-3 mb-5">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Search..."/>
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option selected>Filter Results By Category...</option>
          <option value="test">Test</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select">
          <option selected>Sort By Price...</option>
          <option value="test">Test</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar;