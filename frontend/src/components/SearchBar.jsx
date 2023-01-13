import PropTypes from 'prop-types';

const SearchBar = ({ onSearchChange }) => (
  <div className="w-1/2 flex justify-center items-center">
    <input
      className="border border-slate-50 pl-4 w-full"
      onChange={(e) => onSearchChange(e)}
      type="text"
      placeholder="search..."
    />
  </div>
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func,
};

export default SearchBar;
