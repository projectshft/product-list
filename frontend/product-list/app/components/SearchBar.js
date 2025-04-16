const SearchBar = ({ onChange, onSearch }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        className="form-control my-2"
        onChange={(event) => onChange(event.target.value)}
      ></input>
      <button
        type="button"
        className="btn btn-outline-primary m-2"
        onClick={onSearch}
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
