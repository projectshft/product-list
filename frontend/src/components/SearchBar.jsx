import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearchChange }) => (
  <div className=" flex flex-col justify-center items-center bg-white  border-b drop-shadow-sm">
    {/* <div className="px-5 my-2">
      <Link className="px-2 py-1 bg-green-500 border text-white" to="/new-product">
        + Create New Product
      </Link>
    </div> */}
    <div className="w-fit m-2 flex justify-center items-center">
      <input
        className="border border-slate-50 pl-4 w-full"
        onChange={(e) => onSearchChange(e)}
        type="text"
        placeholder="search..."
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func,
};

export default SearchBar;
